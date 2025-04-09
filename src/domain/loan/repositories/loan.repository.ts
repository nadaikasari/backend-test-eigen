export abstract class LoanRepository {
  abstract findMemberByCode(memberCode: string): Promise<any>;
  abstract findBookByCode(bookCode: string): Promise<any>;
  abstract countActiveLoansByMember(memberId: number): Promise<number>;
  abstract findActiveLoan(memberId: number, bookId: number): Promise<any>;
  abstract createLoan(data: {
    member_id: number;
    book_id: number;
    borrowed_at: Date;
    due_date: Date;
  }): Promise<any>;
  abstract updateBookStock(bookId: number, change: number): Promise<any>;
  abstract updatePenaltyStatus(memberId: number, isPenalized: boolean, penaltyDueDate?: Date | null): Promise<any>;
  abstract returnLoan(memberId: number, bookId: number, returnDate: Date): Promise<any>;
}