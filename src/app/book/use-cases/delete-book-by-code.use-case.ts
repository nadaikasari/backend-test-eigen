import { BadRequestException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/infra/prisma/prisma.service';
import { PrismaBookRepository } from 'src/infra/repositories/book.repository';

@Injectable()
export class DeleteBookByCodeUseCase {
  constructor(
    private readonly bookRepository: PrismaBookRepository,
    private readonly prisma: PrismaService,
    ) {}

  async execute(book_code: string) {
    await Promise.resolve();
    const book = await this.prisma.book.findUnique({
      where: { book_code },
    });

    if (!book) {
      throw new NotFoundException('Book not found');
    }

    const hasLoans = await this.prisma.bookLoan.findMany({
      where: {
        book_id: book.book_id,
      },
    });

    if (hasLoans.length > 0) {
      throw new BadRequestException('Cannot delete book: the book has been borrowed');
    }

    await this.bookRepository.deleteByCode(book_code);

    return {
      statusCode: HttpStatus.OK,
      success: true,
      message: 'Book deleted successfully',
      data: null,
    };
  }
}
