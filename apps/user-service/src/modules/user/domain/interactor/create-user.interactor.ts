import { ConflictException, Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';

import { UserEntity } from '@/common/domain/entities/user.entity';
import { UserRepository } from '@/modules/user/domain/repository/user.repository';
import { CreateUserRequestDto } from '@/modules/user/domain/use-case/create-user/create-user.request-dto';
import { CreateUserResponseDto } from '@/modules/user/domain/use-case/create-user/create-user.response-dto';
import { CreateUserUseCase } from '@/modules/user/domain/use-case/create-user/create-user.use-case';

@Injectable()
export class CreateUserInteractor implements CreateUserUseCase {
  constructor(
    private readonly userRepo: UserRepository,
    private readonly dataSource: DataSource,
  ) {}

  async handle(req: CreateUserRequestDto): Promise<CreateUserResponseDto> {
    return this.dataSource.transaction(async (manager) => {
      if (await this.userRepo.findByEmail(manager, req.email)) {
        throw new ConflictException('email is existed');
      }

      const user = new UserEntity();
      user.email = req.email;
      user.password = req.password;
      const savedUser = await this.userRepo.save(manager, user);

      return new CreateUserResponseDto(savedUser);
    });
  }
}
