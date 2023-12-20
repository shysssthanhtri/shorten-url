import { Injectable } from '@nestjs/common';

import { UserEntity } from '@/common/domain/entities/user.entity';
import { UserRepository } from '@/modules/user/domain/repository/user.repository';

@Injectable()
export class DbUserRepository extends UserRepository {
  async save(user: UserEntity): Promise<UserEntity> {
    return user;
  }
}
