import { EntityManager } from 'typeorm';

import { UrlEntity } from '@/common/domain/entities/url.entity';
import { UserEntity } from '@/common/domain/entities/user.entity';

export abstract class UrlRepository {
  abstract save(manager: EntityManager, url: UrlEntity): Promise<UrlEntity>;

  abstract findUserById(
    manager: EntityManager,
    id: UrlEntity['id'],
  ): Promise<UserEntity | undefined>;
}
