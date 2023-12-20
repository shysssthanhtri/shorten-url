import { EntityManager } from 'typeorm';

import { UserEntity } from '@/common/domain/entities/user.entity';

export abstract class UserRepository {
  abstract findByEmail(
    manager: EntityManager,
    email: UserEntity['email'],
  ): Promise<UserEntity | undefined>;

  abstract save(manager: EntityManager, user: UserEntity): Promise<UserEntity>;
}
