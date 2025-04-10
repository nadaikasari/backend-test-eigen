import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaBookRepository } from 'src/infra/repositories/book.repository';
import { BookDto } from '../dto/book.dto';

@Injectable()
export class UpdateBookByCodeUseCase {
  constructor(private readonly bookRepository: PrismaBookRepository) {}

  async execute(code: string, dto: Partial<BookDto>) {
    const existing = await this.bookRepository.findByCode(code);
    if (!existing) {
      throw new NotFoundException('Book not found');
    }

    const updated = await this.bookRepository.updateByCode(code, dto);

    return {
      statusCode: 200,
      success: true,
      message: 'Book updated successfully',
      data: updated,
    };
  }
}
