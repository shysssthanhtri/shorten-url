import { ApiProperty } from '@nestjs/swagger';
import { BaseResponseDto } from '@shorten-url/base-service';

import { UserEntity } from '@/common/domain/entities/user.entity';

export class CreateUserResponseDto extends BaseResponseDto<UserEntity> {
  @ApiProperty()
  data: UserEntity;

  constructor(user: UserEntity) {
    super();
    this.data = user;
  }
}
