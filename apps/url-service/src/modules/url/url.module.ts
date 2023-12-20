import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UrlEntity } from '@/common/domain/entities/url.entity';
import { UserEntity } from '@/common/domain/entities/user.entity';
import { UrlController } from '@/modules/url/controller/url.controller';
import { CreateUrlInteractor } from '@/modules/url/domain/interactor/create-url.interactor';
import { UrlRepository } from '@/modules/url/domain/repository/url.repository';
import { CreateUrlUseCase } from '@/modules/url/domain/use-case/create-url/create-url.use-case';
import { DbUrlRepository } from '@/modules/url/infrastructure/db.url.repository';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity, UrlEntity])],
  providers: [
    {
      provide: UrlRepository,
      useClass: DbUrlRepository,
    },
    {
      provide: CreateUrlUseCase,
      useClass: CreateUrlInteractor,
    },
  ],
  controllers: [UrlController],
})
export class UrlModule {}
