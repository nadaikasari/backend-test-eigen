import { ApiProperty } from '@nestjs/swagger';
import { IsString} from 'class-validator';

export class BookLoanDto {
  @IsString()
  @ApiProperty({
    description: 'User Member Code',
    example: 'MBR001',
  })
  member_code: string;

  @IsString()
  @ApiProperty({
    description: 'Book Code',
    example: 'BK001',
  })
  book_code: string;
}