import { Module } from '@nestjs/common';
import { BookController } from './book.controller';
import { PrismaBookRepository } from 'src/infra/repositories/book.repository';
import { PrismaService } from 'src/infra/prisma/prisma.service';
import { FindAllBooksUseCase } from './use-cases/find-all-books.use-case';
import { CreateBookUseCase } from './use-cases/create-book.use-case';
import { FindBookByCodeUseCase } from './use-cases/find-book-by-code.use-case';
import { UpdateBookByCodeUseCase } from './use-cases/update-book-by-code.use-case';
import { DeleteBookByCodeUseCase } from './use-cases/delete-book-by-code.use-case';

@Module({
  controllers: [BookController],
  providers: [PrismaBookRepository, PrismaService, FindAllBooksUseCase, CreateBookUseCase, FindBookByCodeUseCase, UpdateBookByCodeUseCase, DeleteBookByCodeUseCase],
})
export class BookModule {}
