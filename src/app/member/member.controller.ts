import { Controller, Get, Query, DefaultValuePipe, ParseIntPipe, Post, Body } from '@nestjs/common';
import { FindAllMembersUseCase } from './use-cases/find-all-members.use-case';
import { CreateMemberUseCase } from './use-cases/create-member.use-case';
import { CreateMemberDto } from './dto/member.dto';

@Controller('/api/member')
export class MemberController {
    constructor(
        private readonly findAllMembersUseCase: FindAllMembersUseCase,
        private readonly createMemberUseCase: CreateMemberUseCase,
    ) {}

    @Get()
    findAll(
        @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
        @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number,
    ) {
        return this.findAllMembersUseCase.execute(page, limit);
    }

    @Post()
    create(@Body() dto: CreateMemberDto) {
      return this.createMemberUseCase.execute(dto);
    }
}
