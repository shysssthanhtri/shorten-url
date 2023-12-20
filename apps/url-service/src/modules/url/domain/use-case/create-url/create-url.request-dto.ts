import { ApiProperty } from '@nestjs/swagger';
import { BaseRequestDto } from '@shorten-url/base-service';
import {
  IsNotEmpty,
  IsNumber,
  IsString,
  MaxLength,
  Min,
} from 'class-validator';

import { UserEntity } from '@/common/domain/entities/user.entity';

export class CreateUrlRequestDto extends BaseRequestDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  @MaxLength(200)
  url: string;

  @ApiProperty()
  @IsNumber()
  @Min(0)
  userId: UserEntity['id'];
}
