import { INestApplication } from '@nestjs/common';
import { genUrlTestData } from '@test/faker/url';
import { genUserTestData } from '@test/faker/user';
import { createTestApp, truncateTestTables } from '@test/test-app';
import * as request from 'supertest';
import { DataSource } from 'typeorm';

import { UrlEntity } from '@/common/domain/entities/url.entity';
import { UserEntity } from '@/common/domain/entities/user.entity';
import { UrlModule } from '@/modules/url/url.module';

describe('[POST] /urls', () => {
  let app: INestApplication;
  let dataSource: DataSource;

  const genRequest = (reqBody: object): request.Test => {
    return request(app.getHttpServer()).post('/urls').send(reqBody);
  };

  beforeAll(async () => {
    [, app, dataSource] = await createTestApp(UrlModule);
  });

  beforeEach(async () => {
    await truncateTestTables(dataSource.manager, [UserEntity, UrlEntity]);
    await dataSource.manager.save([]);
  });

  afterAll(async () => {
    await app.close();
  });

  describe('when user send invalid request', () => {
    describe('when user send invalid url', () => {
      it('should receive 400 when url is undefined', async () => {
        const body = {
          userId: 1,
        };
        await genRequest(body).expect(400);
      });
      it('should receive 400 when url is not string', async () => {
        const body = {
          userId: 1,
          url: 123,
        };
        await genRequest(body).expect(400);
      });
      it('should receive 400 when url is empty string', async () => {
        const body = {
          userId: 1,
          url: '',
        };
        await genRequest(body).expect(400);
      });
      it('should receive 400 when url length larger than 200', async () => {
        const body = {
          userId: 1,
          url: new Array(201).fill('1').join(''),
        };
        await genRequest(body).expect(400);
      });
    });
    describe('when user send invalid userId', () => {
      it('should receive 400 when userId is undefined', async () => {
        const body = {
          url: 'abc',
        };
        await genRequest(body).expect(400);
      });
      it('should receive 400 when userId is not number', async () => {
        const body = {
          url: 'abc',
          userId: 'abc',
        };
        await genRequest(body).expect(400);
      });
      it('should receive 400 when userId is smaller than 0', async () => {
        const body = {
          url: 'abc',
          userId: -1,
        };
        await genRequest(body).expect(400);
      });
      it('should receive 404 when userId is existed', async () => {
        const body = {
          url: 'abc',
          userId: 1,
        };
        await genRequest(body).expect(404);
      });
    });
  });

  describe('when user send valid request', () => {
    const user = genUserTestData();
    beforeEach(async () => {
      await truncateTestTables(dataSource.manager, [UserEntity]);
      await dataSource.manager.save([user]);
    });
    it('should response correct data', async () => {
      const url = genUrlTestData({ userId: user.id });
      const res = await genRequest(url).expect(201);
      expect(res.body.data).toEqual(
        expect.objectContaining({
          url: url.url,
          userId: url.userId,
        }),
      );
    });
    it('should store correct data', async () => {
      const url = genUrlTestData({ userId: user.id });
      const res = await genRequest(url).expect(201);
      const storedUrl = await dataSource.manager.findOneByOrFail(UrlEntity, {
        id: res.body.data.id,
      });
      expect(storedUrl).toEqual(
        expect.objectContaining({
          url: url.url,
          userId: url.userId,
        }),
      );
    });
  });
});
