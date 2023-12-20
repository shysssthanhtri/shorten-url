import { BaseUseCase } from '@shorten-url/base-service';

import { CreateUrlRequestDto } from '@/modules/url/domain/use-case/create-url/create-url.request-dto';
import { CreateUrlResponseDto } from '@/modules/url/domain/use-case/create-url/create-url.response-dto';

export abstract class CreateUrlUseCase extends BaseUseCase<
  CreateUrlRequestDto,
  CreateUrlResponseDto
> {}
