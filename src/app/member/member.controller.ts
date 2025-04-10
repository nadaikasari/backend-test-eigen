import { Controller, Get, Query, DefaultValuePipe, ParseIntPipe } from '@nestjs/common';
import { FindAllMembersUseCase } from './use-cases/find-all-members.use-case';

@Controller('/api/member')
export class MemberController {
    constructor(private readonly findAllMembersUseCase: FindAllMembersUseCase) {}

    @Get()
    findAll(
        @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
        @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number,
    ) {
        return this.findAllMembersUseCase.execute(page, limit);
    }
}
