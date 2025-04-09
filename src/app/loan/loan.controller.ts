import { Controller, Post, Body } from '@nestjs/common';
import { BookLoanDto } from './dto/loan.dto';
import { BorrowBookUseCase } from './use-cases/borrow-book.use-case';
import { ReturnBookUseCase } from './use-cases/return-book.use-case';

@Controller('/api/loan')
export class LoanController {
  constructor(
    private readonly borrowBookUseCase: BorrowBookUseCase,
    private readonly returnBookUseCase: ReturnBookUseCase,
  ) {}

  @Post()
  async borrow(@Body() dto: BookLoanDto) {
    return this.borrowBookUseCase.execute(dto);
  }

  @Post('/return')
  async returnBook(@Body() dto: BookLoanDto) {
    return this.returnBookUseCase.execute(dto);
  }
}
