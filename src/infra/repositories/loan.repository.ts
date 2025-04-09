import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { LoanRepository } from '../../domain/loan/repositories/loan.repository';

@Injectable()
export class PrismaLoanRepository extends LoanRepository {
  constructor(private readonly prisma: PrismaService) {
    super();
  }

  async findMemberByCode(memberCode: string) {
    return this.prisma.member.findUnique({ where: { member_code: memberCode } });
  }

  async findBookByCode(bookCode: string) {
    return this.prisma.book.findUnique({ where: { book_code: bookCode } });
  }

  async countActiveLoansByMember(memberId: number) {
    return this.prisma.bookLoan.count({
      where: { member_id: memberId, is_returned: false },
    });
  }

  async findActiveLoan(memberId: number, bookId: number) {
    return this.prisma.bookLoan.findFirst({
      where: { member_id: memberId, book_id: bookId, is_returned: false },
    });
  }

  async createLoan(data: { member_id: number; book_id: number; borrowed_at: Date; due_date: Date }) {
    return this.prisma.bookLoan.create({ data });
  }

  async updateBookStock(bookId: number, change: number) {
    return this.prisma.book.update({
      where: { book_id: bookId },
      data: { stock: { increment: change } }, // positive = add, negative = subtract
    });
  }

  async updatePenaltyStatus(memberId: number, isPenalized: boolean, penaltyDueDate?: Date | null) {
    return this.prisma.member.update({
      where: { member_id: memberId },
      data: { is_penalized: isPenalized, penalty_due_date: penaltyDueDate ?? null },
    });
  }

  async returnLoan(memberId: number, bookId: number, returnDate: Date) {
    return this.prisma.bookLoan.updateMany({
      where: { member_id: memberId, book_id: bookId, is_returned: false },
      data: { returned_at: returnDate, is_returned: true },
    });
  }
}
