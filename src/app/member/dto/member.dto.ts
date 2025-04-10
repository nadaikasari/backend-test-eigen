import { IsString} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateMemberDto {
    @IsString()
    @ApiProperty({
    description: 'User Member Code',
    example: 'MBR001',
    })
    member_code: string;
  
    @IsString()
    @ApiProperty({
        description: 'User Name',
        example: 'Nada Ika Sari',
    })
    name: string;
}