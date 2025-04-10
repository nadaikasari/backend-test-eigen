import { IsString, IsInt, IsNotEmpty, Min } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class BookDto {
  @IsString()
  @IsNotEmpty()
  book_code: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'The title of the book',
    example: 'Laut Bercerita',
  })
  title: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'The author of the book',
    example: 'Leila S. Chudori',
  })
  author: string;

  @IsInt()
  @Min(0)
  @ApiProperty({
    description: 'Stock book',
    example: 1,
  })
  stock: number;
}
