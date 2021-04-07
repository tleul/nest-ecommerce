import { ApiProperty } from '@nestjs/swagger';
//Pick
import { IsString, IsNumber, Length } from 'class-validator';

export class CreateProductDto {
  @ApiProperty({ description: 'Testing ' })
  @IsString({ message: 'Produt Title can not be empty' })
  @Length(2, 20)
  title: string;
  @ApiProperty()
  @Length(2, 20)
  @IsString({ message: 'Description can not be empty' })
  desc: string;
  @ApiProperty()
  @IsNumber()
  price: number;
}
