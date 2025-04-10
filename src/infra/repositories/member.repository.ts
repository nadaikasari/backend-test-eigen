import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { MemberRepository } from 'src/domain/member/repositories/member.repository';

@Injectable()
export class PrismaMemberRepository implements MemberRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(page: number, limit: number): Promise<any[]> {
    const members = await this.prisma.member.findMany({
      skip: (page - 1) * limit,
      take: limit,
      include: {
        bookLoans: {
          where: { is_returned: false },
          include: {
            book: true,
          },
        },
      },
    });
  
    return members.map((member) => ({
      ...member,
      borrowedBooks: member.bookLoans.map((loan) => loan.book),
      bookLoans: undefined, // remove or null if you prefer
    }));
  }
  
}
