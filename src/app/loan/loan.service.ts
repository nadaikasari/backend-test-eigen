import { Injectable } from '@nestjs/common';
import { PrismaLoanRepository } from '../../infra/repositories/loan.repository';

@Injectable()
export class LoanService {
  constructor(private readonly loanService: PrismaLoanRepository) {}

  borrow(dto: any) {
    return this.loanService.borrow(dto);
  }

  returnBook(dto: any) {
    return this.loanService.returnBook(dto);
  }
}
