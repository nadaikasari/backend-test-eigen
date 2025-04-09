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
import { LoansModule } from './app/loans/loans.module';

@Module({
  imports: [ ConfigModule.forRoot({
    isGlobal: true,
    }),
    BookModule, MemberModule, LoansModule
  ],
  controllers: [AppController, BookController],
  providers: [AppService, BookService, PrismaBookRepository, PrismaService],
})
export class AppModule {}
