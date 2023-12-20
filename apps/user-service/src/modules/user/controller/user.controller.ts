import { Body, Controller, Post } from '@nestjs/common';
import { ApiCreatedResponse, ApiTags } from '@nestjs/swagger';

import { CreateUserRequestDto } from '@/modules/user/domain/use-case/create-user/create-user.request-dto';
import { CreateUserResponseDto } from '@/modules/user/domain/use-case/create-user/create-user.response-dto';
import { CreateUserUseCase } from '@/modules/user/domain/use-case/create-user/create-user.use-case';

@Controller('users')
@ApiTags('Users')
export class UserController {
  constructor(private readonly createUserUseCase: CreateUserUseCase) {}

  @Post()
  @ApiCreatedResponse({ type: CreateUserResponseDto })
  async createUser(
    @Body() body: CreateUserRequestDto,
  ): Promise<CreateUserResponseDto> {
    return this.createUserUseCase.handle(body);
  }
}
