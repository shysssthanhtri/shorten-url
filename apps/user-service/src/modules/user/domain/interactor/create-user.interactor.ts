import { Injectable } from '@nestjs/common';

import { UserEntity } from '@/common/domain/entities/user.entity';
import { UserRepository } from '@/modules/user/domain/repository/user.repository';
import { CreateUserRequestDto } from '@/modules/user/domain/use-case/create-user/create-user.request-dto';
import { CreateUserResponseDto } from '@/modules/user/domain/use-case/create-user/create-user.response-dto';
import { CreateUserUseCase } from '@/modules/user/domain/use-case/create-user/create-user.use-case';

@Injectable()
export class CreateUserInteractor implements CreateUserUseCase {
  constructor(private readonly userRepo: UserRepository) {}

  async handle(req: CreateUserRequestDto): Promise<CreateUserResponseDto> {
    const user = new UserEntity();
    user.email = req.email;
    user.password = req.password;
    const savedUser = await this.userRepo.save(user);
    return new CreateUserResponseDto(savedUser);
  }
}
