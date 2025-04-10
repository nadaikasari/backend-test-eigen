import { IsOptional, IsString, IsInt, Min } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateBookDto {
  @IsOptional()
  @IsString()
  @ApiProperty({
    description: 'The title of the book',
    example: 'Laut Bercerita',
  })
  title?: string;

  @IsOptional()
  @IsString()
  @ApiProperty({
    description: 'The author of the book',
    example: 'Leila S. Chudori',
  })
  author?: string;

  @IsOptional()
  @IsInt()
  @Min(0)
  @ApiProperty({
    description: 'Stock book',
    example: 1,
  })
  stock?: number;
}
