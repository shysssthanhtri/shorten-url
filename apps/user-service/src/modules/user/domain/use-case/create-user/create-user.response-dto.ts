import { ApiProperty } from '@nestjs/swagger';

import { UserEntity } from '@/common/domain/entities/user.entity';
import { BaseResponseDto } from '@/common/domain/use-case/base.response-dto';

export class CreateUserResponseDto extends BaseResponseDto<UserEntity> {
  @ApiProperty()
  data: UserEntity;

  constructor(user: UserEntity) {
    super();
    this.data = user;
  }
}
