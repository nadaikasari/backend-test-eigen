export class BookLoanDto {
  member_code: string;
  book_code: string;
}

export class ResultCreateLoan {
  member_id: number;
  book_id: number;
  borrowed_at: Date;
  due_date: Date;
  returned_at: string;
  stock: number;
}