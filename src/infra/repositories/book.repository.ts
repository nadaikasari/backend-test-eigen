import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Book } from '../../domain/book/entities/book.entity';
import { BookRepository } from '../../domain/book/repositories/book.repository';
import { BookDto } from 'src/app/book/dto/book.dto';

@Injectable()
export class PrismaBookRepository implements BookRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: BookDto): Promise<any> {
    return this.prisma.book.create({
      data: {
        book_code: dto.book_code,
        title: dto.title,
        author: dto.author,
        stock: Number(dto.stock),
      },
    });
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

  async findByCode(code: string): Promise<Book | null> {
    const book = await this.prisma.book.findUnique({ where: { book_code: code } });
    return book ? new Book(book.book_id, book.book_code, book.title, book.author, book.stock) : null;
  }
  
  async updateByCode(code: string, data: Partial<Book>): Promise<Book> {
    const updated = await this.prisma.book.update({
      where: { book_code: code },
      data: {
        ...data,
        stock: data.stock !== undefined ? Number(data.stock) : undefined,
      },
    });
    return new Book(updated.book_id, updated.book_code, updated.title, updated.author, updated.stock);
  }
  
  async deleteByCode(code: string): Promise<void> {
    await this.prisma.book.delete({ where: { book_code: code } });
  }
}
