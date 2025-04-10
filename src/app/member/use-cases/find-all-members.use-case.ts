import { HttpStatus, Injectable } from '@nestjs/common';
import { PrismaMemberRepository } from 'src/infra/repositories/member.repository';

@Injectable()
export class FindAllMembersUseCase {
  constructor(private readonly prismaMemberRepository: PrismaMemberRepository) {}

  async execute(page: number, limit: number) {
    const members = await this.prismaMemberRepository.findAll(page, limit);
    return {
      statusCode: HttpStatus.OK,
      success: true,
      message: 'Member retrieved successfully',
      data: members,
    };
  }
}
