import { Injectable } from '@nestjs/common';
import { PrismaBookRepository } from 'src/infra/repositories/book.repository';

@Injectable()
export class FindAllBooksUseCase {
  constructor(private readonly bookRepository: PrismaBookRepository) {}

  async execute(page: number, limit: number) {
    return this.bookRepository.findAll(page, limit);
  }
}
