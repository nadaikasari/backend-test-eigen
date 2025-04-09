import { IsString, IsInt, IsNotEmpty, Min } from 'class-validator';

export class BookDto {
  @IsString()
  @IsNotEmpty()
  book_code: string;

  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  author: string;

  @IsInt()
  @Min(0)
  stock: number;
}
