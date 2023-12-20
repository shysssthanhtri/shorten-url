import { BaseRequestDto } from '@/common/domain/use-case/base.request-dto';

export class CreateUserRequestDto extends BaseRequestDto {
  email: string;

  password: string;
}
