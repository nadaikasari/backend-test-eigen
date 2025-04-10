import { HttpStatus, Injectable } from '@nestjs/common';
import { CreateMemberDto } from '../dto/member.dto';
import { PrismaMemberRepository } from 'src/infra/repositories/member.repository';

@Injectable()
export class CreateMemberUseCase {
  constructor(private readonly memberRepository: PrismaMemberRepository) {}

  async execute(dto: CreateMemberDto) {
    const created = await this.memberRepository.create(dto);
    return {
      statusCode: HttpStatus.CREATED,
      success: true,
      message: 'Member created successfully',
      data: created,
    };
  }
}
