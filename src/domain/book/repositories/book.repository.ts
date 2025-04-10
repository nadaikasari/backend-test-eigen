import { Book } from '../entities/book.entity';

export abstract class BookRepository {
  abstract create(data: Omit<Book, 'book_id'>): Promise<Book>;
  abstract findAll(): Promise<{ code: string; title: string; author: string; stock: number }[]>;
  abstract findByCode(book_code: string): Promise<Book | null>;
  abstract updateByCode(book_code: string, data: Partial<Book>): Promise<Book>;
  abstract deleteByCode(book_code: string): Promise<void>;
}
