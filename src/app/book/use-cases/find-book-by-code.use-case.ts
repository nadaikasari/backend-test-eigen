import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaBookRepository } from 'src/infra/repositories/book.repository';

@Injectable()
export class FindBookByCodeUseCase {
  constructor(private readonly bookRepository: PrismaBookRepository) {}

  async execute(code: string) {
    const book = await this.bookRepository.findByCode(code);

    if (!book) {
      throw new NotFoundException('Book not found');
    }

    return {
      statusCode: 200,
      success: true,
      message: 'Book retrieved successfully',
      data: book,
    };
  }
}
