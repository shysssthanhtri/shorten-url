import {
  DynamicModule,
  INestApplication,
  ValidationPipe,
} from '@nestjs/common';
import { Type } from '@nestjs/common/interfaces/type.interface';
import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource, EntityManager } from 'typeorm';

import { ConfigService } from '@/config/config.service';
import { getConnectionConfig } from '@/ormconfig';

export const createTestApp = async <T>(
  mainModule: Type<T> | DynamicModule,
  requiredModules: Type<T>[] | DynamicModule[] = [],
): Promise<[TestingModule, INestApplication, DataSource]> => {
  await ConfigService.initialize();

  const moduleRef = await Test.createTestingModule({
    imports: [
      TypeOrmModule.forRootAsync({
        useFactory: () => ({
          ...getConnectionConfig(),
          autoLoadEntities: true,
          synchronize: true,
          dropSchema: true,
        }),
      }),
      mainModule,
      ...requiredModules,
    ],
  }).compile();

  const app = moduleRef.createNestApplication();
  app.useGlobalPipes(new ValidationPipe());
  app.setGlobalPrefix(ConfigService.get('SERVICE_PREFIX'));
  await app.init();

  const dataSource = await app.resolve(DataSource);
  const module = moduleRef.select(mainModule) as TestingModule;

  return [module, app, dataSource];
};

export function truncateTestTables(manager: EntityManager, entities: any[]) {
  return Promise.all(
    entities.map(async (e) => {
      return manager.clear(e);
    }),
  );
}
