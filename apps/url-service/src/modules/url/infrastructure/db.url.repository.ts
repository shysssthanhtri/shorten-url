import { Injectable } from '@nestjs/common';
import { EntityManager } from 'typeorm';

import { UrlEntity } from '@/common/domain/entities/url.entity';
import { UrlRepository } from '@/modules/url/domain/repository/url.repository';

@Injectable()
export class DbUrlRepository extends UrlRepository {
  save(manager: EntityManager, url: UrlEntity): Promise<UrlEntity> {
    return manager.save(url);
  }
}
