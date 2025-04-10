export abstract class MemberRepository {
    abstract findAll(page: number, limit: number): Promise<any>;
  }
  