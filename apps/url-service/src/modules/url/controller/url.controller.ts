import { Body, Controller, Post } from '@nestjs/common';
import { ApiCreatedResponse, ApiTags } from '@nestjs/swagger';

import { CreateUrlRequestDto } from '@/modules/url/domain/use-case/create-url/create-url.request-dto';
import { CreateUrlResponseDto } from '@/modules/url/domain/use-case/create-url/create-url.response-dto';
import { CreateUrlUseCase } from '@/modules/url/domain/use-case/create-url/create-url.use-case';

@Controller('urls')
@ApiTags('Urls')
export class UrlController {
  constructor(private readonly createUrlUseCase: CreateUrlUseCase) {}

  @Post()
  @ApiCreatedResponse({
    type: CreateUrlResponseDto,
  })
  async createUrl(
    @Body() body: CreateUrlRequestDto,
  ): Promise<CreateUrlResponseDto> {
    return this.createUrlUseCase.handle(body);
  }
}
