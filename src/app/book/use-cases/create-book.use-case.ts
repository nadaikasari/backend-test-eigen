import { HttpStatus, Injectable } from '@nestjs/common';
import { PrismaBookRepository } from 'src/infra/repositories/book.repository';
import { BookDto } from '../dto/book.dto';

@Injectable()
export class CreateBookUseCase {
  constructor(private readonly bookRepository: PrismaBookRepository) {}

  async execute(dto: BookDto) {
    const created = await this.bookRepository.create(dto);
    return {
      statusCode: HttpStatus.CREATED,
      success: true,
      message: 'Book created successfully',
      data: created,
    };    
  }
}
