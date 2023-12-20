import { EntityManager } from 'typeorm';

import { UrlEntity } from '@/common/domain/entities/url.entity';

export abstract class UrlRepository {
  abstract save(manager: EntityManager, url: UrlEntity): Promise<UrlEntity>;
}
