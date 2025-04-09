import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BookModule } from './app/book/book.module';
import { MemberModule } from './app/member/member.module';
import { ConfigModule } from '@nestjs/config';
import { BookService } from './app/book/book.service';
import { PrismaBookRepository } from './infra/repositories/book.repository';
import { PrismaService } from './infra/prisma/prisma.service';
import { BookController } from './app/book/book.controller';
import { LoanController } from './app/loan/loan.controller';
import { LoanModule } from './app/loan/loan.module';
import { LoanService } from './app/loan/loan.service';
import { PrismaLoanRepository } from './infra/repositories/loan.repository';

@Module({
  imports: [ ConfigModule.forRoot({
    isGlobal: true,
    }),
    BookModule, MemberModule, LoanModule
  ],
  controllers: [AppController, BookController, LoanController],
  providers: [AppService, BookService, PrismaBookRepository, PrismaService, LoanService, PrismaLoanRepository],
})
export class AppModule {}
