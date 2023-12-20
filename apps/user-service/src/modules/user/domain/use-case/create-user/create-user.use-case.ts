import { BaseUseCase } from '@shorten-url/base-service';

import { CreateUserRequestDto } from '@/modules/user/domain/use-case/create-user/create-user.request-dto';
import { CreateUserResponseDto } from '@/modules/user/domain/use-case/create-user/create-user.response-dto';

export abstract class CreateUserUseCase extends BaseUseCase<
  CreateUserRequestDto,
  CreateUserResponseDto
> {}
