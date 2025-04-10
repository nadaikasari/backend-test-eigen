import { HttpStatus, Injectable } from '@nestjs/common';
import { PrismaBookRepository } from 'src/infra/repositories/book.repository';

@Injectable()
export class FindAllBooksUseCase {
  constructor(private readonly bookRepository: PrismaBookRepository) {}

  async execute(page: number, limit: number) {
    const books = await this.bookRepository.findAll(page, limit);
    return {
      statusCode: HttpStatus.OK,
      success: true,
      message: 'Books retrieved successfully',
      data: books,
    };
  }
}
