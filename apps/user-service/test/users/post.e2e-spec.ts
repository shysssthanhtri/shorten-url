import { INestApplication } from '@nestjs/common';
import { genUserTestData } from '@test/faker/user';
import { createTestApp, truncateTestTables } from '@test/test-app';
import * as request from 'supertest';
import { DataSource } from 'typeorm';

import { UserEntity } from '@/common/domain/entities/user.entity';
import { UserModule } from '@/modules/user/user.module';

describe('[POST] /users', () => {
  let app: INestApplication;
  let dataSource: DataSource;

  const genRequest = (reqBody: object): request.Test => {
    return request(app.getHttpServer()).post('/users').send(reqBody);
  };

  beforeAll(async () => {
    [, app, dataSource] = await createTestApp(UserModule);
  });

  beforeEach(async () => {
    await truncateTestTables(dataSource.manager, [UserEntity]);
    await dataSource.manager.save([]);
  });

  afterAll(async () => {
    app.close();
  });

  describe('when user send invalid request', () => {
    describe('when user send invalid email', () => {
      const validPassword = '123456';
      it('should receive 400 when email is undefined', async () => {
        await genRequest({
          password: validPassword,
        }).expect(400);
      });
      it('should receive 400 when email is not string', async () => {
        await genRequest({
          password: validPassword,
          email: 123,
        }).expect(400);
      });
      it('should receive 400 when email is empty string', async () => {
        await genRequest({
          password: validPassword,
          email: '',
        }).expect(400);
      });
      it('should receive 400 when email is not email', async () => {
        await genRequest({
          password: validPassword,
          email: 'abcdef',
        }).expect(400);
      });
      it('should receive 409 when email is existed', async () => {
        const user = genUserTestData();
        await dataSource.manager.save([user]);

        await genRequest({
          password: validPassword,
          email: user.email,
        }).expect(409);
      });
    });
    describe('when user send invalid password', () => {
      const user = genUserTestData();
      it('should receive 400 when password is undefined', async () => {
        await genRequest({
          email: user.email,
        }).expect(400);
      });
      it('should receive 400 when password is not string', async () => {
        await genRequest({
          email: user.email,
          password: 1234,
        }).expect(400);
      });
      it("should receive 400 when password's length is under 5", async () => {
        await genRequest({
          email: user.email,
          password: '1234',
        }).expect(400);
      });
      it("should receive 400 when password's length is upper 20", async () => {
        await genRequest({
          email: user.email,
          password: '123451234512345123451',
        }).expect(400);
      });
    });
  });

  describe('when user send valid request', () => {
    const user = genUserTestData();
    it('should response correct data', async () => {
      const res = await genRequest({
        email: user.email,
        password: user.password,
      }).expect(201);
      expect(res.body.data).toEqual(
        expect.objectContaining({
          email: user.email,
          password: user.password,
        }),
      );
    });
    it('should store correct data', async () => {
      await genRequest({
        email: user.email,
        password: user.password,
      }).expect(201);
      const storedUser = await dataSource.manager.findOneByOrFail(UserEntity, {
        email: user.email,
      });
      expect(storedUser).toEqual(
        expect.objectContaining({
          email: user.email,
          password: user.password,
        }),
      );
      expect(storedUser.password).toBe(user.password);
    });
  });
});
