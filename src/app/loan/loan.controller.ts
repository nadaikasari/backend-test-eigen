import { Controller, Post, Body } from '@nestjs/common';
import { LoanService } from './loan.service';

@Controller('/api/loan')
export class LoanController {
    constructor(private readonly loanService: LoanService) {}

    @Post()
    borrow(@Body() dto: any) {
        return this.loanService.borrow(dto);
    }

    @Post('/return')
    returnBook(@Body() dto: any) {
        return this.loanService.returnBook(dto);
    }
}
