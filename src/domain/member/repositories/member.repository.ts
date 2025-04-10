import { CreateMemberDto } from "src/app/member/dto/member.dto";

export abstract class MemberRepository {
    abstract findAll(page: number, limit: number): Promise<any>;
    abstract create(dto: CreateMemberDto): Promise<any>;
  }
  