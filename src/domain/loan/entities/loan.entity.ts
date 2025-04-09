export class Loan {
    constructor(
      public readonly book_loan_id: number,
      public member_id: number,
      public book_id: number,
      public borrowed_at: Date,
      public due_date: Date,
      public returned_at: string,
      public stock: number,
    ) {}
  }
  