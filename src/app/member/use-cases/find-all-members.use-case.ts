import { Injectable } from '@nestjs/common';
import { PrismaMemberRepository } from 'src/infra/repositories/member.repository';

@Injectable()
export class FindAllMembersUseCase {
  constructor(private readonly prismaMemberRepository: PrismaMemberRepository) {}

  async execute(page: number, limit: number) {
    return this.prismaMemberRepository.findAll(page, limit);
  }
}
