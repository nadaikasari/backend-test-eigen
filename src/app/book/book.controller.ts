import { Controller, Get, Post, Body, Param, Patch, Delete, Query, DefaultValuePipe, ParseIntPipe, HttpStatus, HttpCode } from '@nestjs/common';
import { FindAllBooksUseCase } from './use-cases/find-all-books.use-case';
import { CreateBookUseCase } from './use-cases/create-book.use-case';
import { BookDto } from './dto/book.dto';
import { FindBookByCodeUseCase } from './use-cases/find-book-by-code.use-case';
import { UpdateBookByCodeUseCase } from './use-cases/update-book-by-code.use-case';
import { DeleteBookByCodeUseCase } from './use-cases/delete-book-by-code.use-case';
import { UpdateBookDto } from './dto/update-book.dto';

@Controller('/api/book')
export class BookController {
  constructor(
    private readonly findAllBooksUseCase: FindAllBooksUseCase,
    private readonly createBookUseCase: CreateBookUseCase,
    private readonly findBookByCodeUseCase: FindBookByCodeUseCase,
    private readonly updateBookByCodeUseCase: UpdateBookByCodeUseCase,
    private readonly deleteBookByCodeUseCase: DeleteBookByCodeUseCase,
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

  @Get(':code')
  async findOne(@Param('code') code: string) {
    return this.findBookByCodeUseCase.execute(code);
  }

  @Patch(':code')
  async update(@Param('code') code: string, @Body() dto: UpdateBookDto) {
    return this.updateBookByCodeUseCase.execute(code, dto);
  }

  @Delete(':code')
  async remove(@Param('code') code: string) {
    return this.deleteBookByCodeUseCase.execute(code);
  }
}
