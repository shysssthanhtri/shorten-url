import { BaseRequestDto } from './base.request-dto';
import { BaseResponseDto } from './base.response-dto';

export abstract class BaseUseCase<
  RequestDto extends BaseRequestDto,
  ResponseDto extends BaseResponseDto,
> {
  abstract handle(req: RequestDto): Promise<ResponseDto> | ResponseDto;
}
