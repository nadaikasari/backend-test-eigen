import { BadRequestException, Injectable } from '@nestjs/common';
import { LoanRepository } from '../../../domain/loan/repositories/loan.repository';
import { BookLoanDto } from '../dto/loan.dto';

@Injectable()
export class BorrowBookUseCase {
  constructor(private readonly repo: LoanRepository) {}

  async execute(dto: BookLoanDto) {
    const member = await this.repo.findMemberByCode(dto.member_code);
    if (!member) throw new BadRequestException('Member not found');

    const now = new Date();

    // Cek apakah member masih kena penalti
    if (member.is_penalized && member.penalty_due_date && now < member.penalty_due_date) {
      throw new BadRequestException('Member is currently being penalized');
    }

    // Jika waktu penalti sudah lewat, reset penalti
    if (member.is_penalized && member.penalty_due_date && now > member.penalty_due_date) {
      await this.repo.updatePenaltyStatus(member.member_id, false, null);
    }

    const book = await this.repo.findBookByCode(dto.book_code);
    if (!book) throw new BadRequestException('Book not found');
    if (book.stock <= 0) throw new BadRequestException('Book is out of stock');

    const activeLoans = await this.repo.countActiveLoansByMember(member.member_id);
    if (activeLoans >= 2) {
      throw new BadRequestException('Member has already borrowed 2 books');
    }

    const existingLoan = await this.repo.findActiveLoan(member.member_id, book.book_id);
    if (existingLoan) {
      throw new BadRequestException('This book is currently borrowed by the member');
    }

    const borrowedAt = new Date();
    const dueDate = new Date(borrowedAt);
    dueDate.setDate(borrowedAt.getDate() + 7);

    const createdLoan = await this.repo.createLoan({
      member_id: member.member_id,
      book_id: book.book_id,
      borrowed_at: borrowedAt,
      due_date: dueDate,
    });

    await this.repo.updateBookStock(book.book_id, -1);

    return {
      statusCode: 201,
      message: 'Book borrowed successfully',
      data: {
        bookLoanId: createdLoan.book_loan_id,
        memberId: createdLoan.member_id,
        bookId: createdLoan.book_id,
        borrowedAt: createdLoan.borrowed_at,
        dueDate: createdLoan.due_date,
        isReturned: createdLoan.is_returned,
        returnedAt: createdLoan.returned_at,
      },
    };
  }
}
