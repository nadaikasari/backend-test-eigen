import { Book } from '../entities/book.entity';

export abstract class BookRepository {
  abstract create(data: Omit<Book, 'book_id'>): Promise<Book>;
  abstract findAll(): Promise<{ code: string; title: string; author: string; stock: number }[]>;
  abstract findById(id: number): Promise<Book | null>;
  abstract update(id: number, data: Partial<Book>): Promise<Book>;
  abstract delete(id: number): Promise<void>;
}
