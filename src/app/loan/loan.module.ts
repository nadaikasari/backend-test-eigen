import { Module } from '@nestjs/common';
import { LoanController } from './loan.controller';
import { PrismaLoanRepository } from 'src/infra/repositories/loan.repository';
import { PrismaService } from 'src/infra/prisma/prisma.service';
import { BorrowBookUseCase } from './use-cases/borrow-book.use-case';
import { ReturnBookUseCase } from './use-cases/return-book.use-case';
import { LoanRepository } from 'src/domain/loan/repositories/loan.repository';

@Module({
    controllers: [LoanController],
    providers: [
        PrismaService,
        {
          provide: LoanRepository,
          useClass: PrismaLoanRepository,
        },
        BorrowBookUseCase,
        ReturnBookUseCase,
      ],
})
export class LoanModule {}
