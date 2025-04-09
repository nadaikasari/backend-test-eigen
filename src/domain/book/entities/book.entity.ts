export class Book {
    constructor(
      public readonly book_id: number,
      public book_code: string,
      public title: string,
      public author: string,
      public stock: number,
    ) {}
  }
  