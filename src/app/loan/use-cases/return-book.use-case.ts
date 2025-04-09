import { BadRequestException, Injectable } from '@nestjs/common';
import { BookLoanDto } from '../dto/loan.dto';
import { LoanRepository } from '../../../domain/loan/repositories/loan.repository';

@Injectable()
export class ReturnBookUseCase {
  constructor(private readonly repository: LoanRepository) {}

  async execute(dto: BookLoanDto) {
    const member = await this.repository.findMemberByCode(dto.member_code);
    if (!member) throw new BadRequestException('Member not found');

    const book = await this.repository.findBookByCode(dto.book_code);
    if (!book) throw new BadRequestException('Book not found');

    const activeLoan = await this.repository.findActiveLoan(member.member_id, book.book_id);
    if (!activeLoan) {
      return {
        statusCode: 404,
        message: 'No active loan found for this book and member',
      };
    }

    const now = new Date();
    let penaltyMessage = '';

    if (now > activeLoan.due_date) {
        const penaltyDueDate = new Date();
        penaltyDueDate.setDate(penaltyDueDate.getDate() + 3);
        await this.repository.updatePenaltyStatus(member.member_id, true, penaltyDueDate);
        penaltyMessage = 'User is penalized due to late return';
    }

    await this.repository.returnLoan(member.member_id, book.book_id, now);
    await this.repository.updateBookStock(book.book_id, 1);

    return {
      statusCode: 201,
      message: penaltyMessage || 'Book returned successfully',
    };
  }
}
