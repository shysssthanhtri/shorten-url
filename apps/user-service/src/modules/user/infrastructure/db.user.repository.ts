import { Injectable } from '@nestjs/common';
import { EntityManager } from 'typeorm';

import { UserEntity } from '@/common/domain/entities/user.entity';
import { UserRepository } from '@/modules/user/domain/repository/user.repository';

@Injectable()
export class DbUserRepository extends UserRepository {
  save(manager: EntityManager, user: UserEntity): Promise<UserEntity> {
    return manager.save(user);
  }

  findByEmail(
    manager: EntityManager,
    email: UserEntity['email'],
  ): Promise<UserEntity | undefined> {
    return manager.findOneBy(UserEntity, { email });
  }
}
