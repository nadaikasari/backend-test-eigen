import { Controller, Get, Post, Body, Param, Patch, Delete, Query, DefaultValuePipe, ParseIntPipe } from '@nestjs/common';
import { FindAllBooksUseCase } from './use-cases/find-all-books.use-case';
import { CreateBookUseCase } from './use-cases/create-book.use-case';
import { BookDto } from './dto/book.dto';

@Controller('/api/book')
export class BookController {
  constructor(
    private readonly findAllBooksUseCase: FindAllBooksUseCase,
    private readonly createBookUseCase: CreateBookUseCase,
  ) {}

  @Get()
  findAll(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number,
  ) {
    return this.findAllBooksUseCase.execute(page, limit);
  }

  @Post()
  create(@Body() dto: BookDto) {
    return this.createBookUseCase.execute(dto);
  }
}
