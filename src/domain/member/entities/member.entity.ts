export class Member {
    constructor(
      public readonly member_id: number,
      public member_code: number,
      public name: string,
      public is_penalized: boolean,
      public penalty_due_date: Date,
    ) {}
  }
  