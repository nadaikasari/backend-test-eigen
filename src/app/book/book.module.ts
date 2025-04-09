import { Module } from '@nestjs/common';
import { BookController } from './book.controller';
import { PrismaBookRepository } from 'src/infra/repositories/book.repository';
import { PrismaService } from 'src/infra/prisma/prisma.service';
import { FindAllBooksUseCase } from './use-cases/find-all-books.use-case';
import { CreateBookUseCase } from './use-cases/create-book.use-case';

@Module({
  controllers: [BookController],
  providers: [PrismaBookRepository, PrismaService, FindAllBooksUseCase, CreateBookUseCase],
})
export class BookModule {}
