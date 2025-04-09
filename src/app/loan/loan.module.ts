import { Module } from '@nestjs/common';
import { LoanController } from './loan.controller';
import { LoanService } from './loan.service';
import { PrismaLoanRepository } from 'src/infra/repositories/loan.repository';
import { PrismaService } from 'src/infra/prisma/prisma.service';

@Module({
    controllers: [LoanController],
    providers: [LoanService, PrismaLoanRepository, PrismaService],
})
export class LoanModule {}
