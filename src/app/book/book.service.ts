import { Injectable } from '@nestjs/common';
import { PrismaBookRepository } from '../../infra/repositories/book.repository';

@Injectable()
export class BookService {
  constructor(private readonly bookRepository: PrismaBookRepository) {}

  create(dto: any) {
    return this.bookRepository.create(dto);
  }

  findAll(page: number, limit: number) {
    return this.bookRepository.findAll(page, limit);
  }

  findById(id: number) {
    return this.bookRepository.findById(id);
  }

  update(id: number, dto: any) {
    return this.bookRepository.update(id, dto);
  }

  delete(id: number) {
    return this.bookRepository.delete(id);
  }
}
