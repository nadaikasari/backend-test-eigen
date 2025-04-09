import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { LoanRepository } from '../../domain/loan/repositories/loan.repository';
import { BookLoanDto } from 'src/app/loan/dto/loan.dto';

@Injectable()
export class PrismaLoanRepository implements LoanRepository {
  constructor(private readonly prisma: PrismaService) {}

  async borrow(dto: BookLoanDto) {
    const member = await this.getValidMember(dto.member_code);
    const book = await this.getAvailableBook(dto.book_code);
    await this.validateLoanConstraints(member.member_id, book);
  
    const borrowedAt = new Date();
    const dueDate = this.calculateDueDate(borrowedAt);

    const createdLoan = await this.prisma.bookLoan.create({
      data: {
        member_id: member.member_id,
        book_id: book.book_id,
        borrowed_at: borrowedAt,
        due_date: dueDate,
      },
    });

    await this.prisma.book.update({
      where: { book_id: book.book_id },
      data: {
        stock: {
          decrement: 1,
        },
      },
    });
  
    return this.formatLoanResponse(createdLoan);
  }
  
  private async getValidMember(memberCode: string) {
    const member = await this.prisma.member.findUnique({
      where: { member_code: memberCode },
    });
  
    if (!member) {
      throw new BadRequestException('Member not found');
    }
    const dateNow = new Date();

    if(member.penalty_due_date) {
      if (member.is_penalized && dateNow < member.penalty_due_date) {
        throw new BadRequestException('Member is currently being penalized');
      } else if(member.is_penalized && dateNow > member.penalty_due_date) {
        // Update penalty to false because the user's penalty due date has passed
        await this.prisma.member.update({
          where: { member_id: member.member_id },
          data: {
            is_penalized: false
          },
        });
      }
    }
  
    return member;
  }
  
  private async getAvailableBook(bookCode: string) {
    const book = await this.prisma.book.findUnique({
      where: { book_code: bookCode },
    });
  
    if (!book) {
      throw new BadRequestException('Book not found');
    }

    if (book.stock <= 0) {
      throw new BadRequestException('Book is out of stock');
    }
  
    return book;
  }
  
  private async validateLoanConstraints(memberId: number, book: any) {
    const activeLoans = await this.prisma.bookLoan.count({
      where: {
        member_id: memberId,
        is_returned: false,
      },
    });
  
    if (activeLoans >= 2) {
      throw new BadRequestException('Member has already borrowed 2 books');
    }

    if (book.stock <= 0) {
      throw new BadRequestException('Book is out of stock');
    }
  }
  
  private calculateDueDate(borrowedAt: Date): Date {
    const dueDate = new Date(borrowedAt);
    dueDate.setDate(dueDate.getDate() + 7);
    return dueDate;
  }
  
  private formatLoanResponse(loan: any) {
    return {
      statusCode: 201,
      message: 'Book borrowed successfully',
      data: {
        bookLoanId: loan.book_loan_id,
        memberId: loan.member_id,
        bookId: loan.book_id,
        borrowedAt: loan.borrowed_at,
        dueDate: loan.due_date,
        isReturned: loan.is_returned,
        returnedAt: loan.returned_at,
      },
    };
  }

  async returnBook(dto: BookLoanDto) {
    const member = await this.getMember(dto.member_code);
    const book = await this.getBook(dto.book_code);
    const dateNow = new Date();
  
    // Find the active loan for the member and book
    const activeLoan = await this.prisma.bookLoan.findFirst({
      where: {
        member_id: member.member_id,
        book_id: book.book_id,
        is_returned: false,
      },
    });
  
    if (activeLoan) {
      const penaltyMessage = await this.applyPenaltyIfLate(activeLoan, member, dateNow);
    
      await this.returnBookLoan(activeLoan, dateNow);
      await this.incrementBookStock(book);
  
      return {
        statusCode: 201,
        message: penaltyMessage || 'Book return successfully',
      };
    }
  
    // If no active loan is found
    return {
      statusCode: 404,
      message: 'No active loan found for this book and member',
    };
  }

  private async getMember(memberCode: string) {
    const member = await this.prisma.member.findUnique({
      where: { member_code: memberCode },
    });
  
    if (!member) {
      throw new BadRequestException('Member not found');
    }

    return member;
  }

  private async getBook(bookCode: string) {
    const book = await this.prisma.book.findUnique({
      where: { book_code: bookCode },
    });
  
    if (!book) {
      throw new BadRequestException('Book not found');
    }

    return book;
  }
  
  private async applyPenaltyIfLate(activeLoan: any, member: any, dateNow: Date): Promise<string | null> {
    if (dateNow > activeLoan.due_date) {
      const penaltyDueDate = new Date();
      penaltyDueDate.setDate(penaltyDueDate.getDate() + 3);
  
      await this.prisma.member.update({
        where: { member_id: member.member_id },
        data: {
          is_penalized: true,
          penalty_due_date: penaltyDueDate,
        },
      });
  
      return 'User is penalized due to late return';
    }
    return null;
  }
  
  private async returnBookLoan(activeLoan: any, dateNow: Date) {
    await this.prisma.bookLoan.updateMany({
      where: {
        member_id: activeLoan.member_id,
        book_id: activeLoan.book_id,
        is_returned: false,
      },
      data: {
        returned_at: dateNow,
        is_returned: true,
      },
    });
  }
  
  private async incrementBookStock(book: any) {
    await this.prisma.book.update({
      where: { book_id: book.book_id },
      data: {
        stock: {
          increment: 1,
        },
      },
    });
  }
    
}
