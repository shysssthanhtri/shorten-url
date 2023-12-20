import { BaseRequestDto } from '@/domain/use-case/base.request-dto';
import { BaseResponseDto } from '@/domain/use-case/base.response-dto';

export abstract class BaseUseCase<
  RequestDto extends BaseRequestDto,
  ResponseDto extends BaseResponseDto,
> {
  abstract handle(req: RequestDto): Promise<ResponseDto> | ResponseDto;
}
