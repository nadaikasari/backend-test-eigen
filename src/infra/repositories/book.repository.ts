import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Book } from '../../domain/book/entities/book.entity';
import { BookRepository } from '../../domain/book/repositories/book.repository';

@Injectable()
export class PrismaBookRepository implements BookRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: Omit<Book, 'book_id'>): Promise<Book> {
    const created = await this.prisma.book.create({ data });
    return new Book(created.book_id, created.book_code, created.title, created.author, created.stock);
  }

  async findAll(
    page = 1,
    limit = 10
  ): Promise<{ code: string; title: string; author: string; stock: number }[]> {
    const skip = (page - 1) * limit;
  
    const books = await this.prisma.book.findMany({
      select: {
        book_code: true,
        title: true,
        author: true,
        stock: true,
      },
      orderBy: {
        stock: 'desc',
      },
      skip,
      take: limit,
    });
  
    return books.map((b) => ({
      code: b.book_code,
      title: b.title,
      author: b.author,
      stock: b.stock,
    }));
  }  

  async findById(id: number): Promise<Book | null> {
    const book = await this.prisma.book.findUnique({ where: { book_id: id } });
    return book ? new Book(book.book_id, book.book_code, book.title, book.author, book.stock) : null;
  }

  async update(id: number, data: Partial<Book>): Promise<Book> {
    const updated = await this.prisma.book.update({ where: { book_id: id }, data });
    return new Book(updated.book_id, updated.book_code, updated.title, updated.author, updated.stock);
  }

  async delete(id: number): Promise<void> {
    await this.prisma.book.delete({ where: { book_id: id } });
  }
}
