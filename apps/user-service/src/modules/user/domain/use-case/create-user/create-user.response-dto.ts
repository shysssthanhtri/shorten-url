import { UserEntity } from '@/common/domain/entities/user.entity';
import { BaseResponseDto } from '@/common/domain/use-case/base.response-dto';

export class CreateUserResponseDto extends BaseResponseDto<UserEntity> {
  data: UserEntity;

  constructor(user: UserEntity) {
    super();
    this.data = user;
  }
}
