import { Module } from '@nestjs/common';

import { UserController } from '@/modules/user/controller/user.controller';
import { CreateUserInteractor } from '@/modules/user/domain/interactor/create-user.interactor';
import { UserRepository } from '@/modules/user/domain/repository/user.repository';
import { CreateUserUseCase } from '@/modules/user/domain/use-case/create-user/create-user.use-case';
import { DbUserRepository } from '@/modules/user/infrastructure/db.user.repository';

@Module({
  controllers: [UserController],
  providers: [
    {
      provide: UserRepository,
      useClass: DbUserRepository,
    },
    {
      provide: CreateUserUseCase,
      useClass: CreateUserInteractor,
    },
  ],
})
export class UserModule {}
