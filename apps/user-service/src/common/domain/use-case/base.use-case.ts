import { BaseRequestDto } from '@/common/domain/use-case/base.request-dto';
import { BaseResponseDto } from '@/common/domain/use-case/base.response-dto';

export abstract class BaseUseCase<
  RequestDto extends BaseRequestDto,
  ResponseDto extends BaseResponseDto,
> {
  abstract handle(req: RequestDto): Promise<ResponseDto> | ResponseDto;
}
