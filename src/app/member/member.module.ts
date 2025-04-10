import { Module } from '@nestjs/common';
import { MemberController } from './member.controller';
import { PrismaMemberRepository } from 'src/infra/repositories/member.repository';
import { PrismaService } from 'src/infra/prisma/prisma.service';
import { FindAllMembersUseCase } from './use-cases/find-all-members.use-case';

@Module({
    controllers: [MemberController],
    providers: [PrismaMemberRepository, PrismaService, FindAllMembersUseCase],
})
export class MemberModule {}
