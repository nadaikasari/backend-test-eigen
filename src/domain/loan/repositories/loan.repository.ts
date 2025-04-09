import { Loan } from '../entities/loan.entity';
import { BookLoanDto, ResultCreateLoan } from '../../../app/loan/dto/loan.dto';

export abstract class LoanRepository {

   /**
   * Creates a new loan (borrow a book) for a member.
   * 
   * Business rules:
   * - Members may not borrow more than 2 books.
   * - Borrowed books are not borrowed by other members.
   * - Member is currently not being penalized.
   *  
   * @param dto Data Transfer Object containing memberCode and bookCode.
   * @returns ResultCreateLoan
   */
  // abstract borrow(dto: CreateLoanDto): Promise<ResultCreateLoan>;
  abstract borrow(dto: BookLoanDto);

  /**
   * Return book loan 
   * 
   * Business rules:
   * - The returned book is a book that the member has borrowed
   * - If the book is returned after more than 7 days, the member will be subject to a penalty. Member with penalty cannot able to borrow the book for 3 days
   * 
   * @param dto Data Transfer Object containing memberCode and bookCode.
   */
  abstract returnBook(dto: BookLoanDto);


}
