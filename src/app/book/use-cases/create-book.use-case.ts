import { Injectable } from '@nestjs/common';
import { PrismaBookRepository } from 'src/infra/repositories/book.repository';

@Injectable()
export class CreateBookUseCase {
  constructor(private readonly bookRepository: PrismaBookRepository) {}

  async execute(dto: any) {
    return this.bookRepository.create(dto);
  }
}
