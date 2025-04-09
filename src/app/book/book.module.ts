import { Module } from '@nestjs/common';
import { BookController } from './book.controller';
import { BookService } from './book.service';
import { PrismaBookRepository } from 'src/infra/repositories/book.repository';
import { PrismaService } from 'src/infra/prisma/prisma.service';

@Module({
  controllers: [BookController],
  providers: [BookService, PrismaBookRepository, PrismaService],
})
export class BookModule {}
