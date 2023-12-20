import { ApiProperty } from '@nestjs/swagger';
import { BaseResponseDto } from '@shorten-url/base-service';

import { UrlEntity } from '@/common/domain/entities/url.entity';

export class CreateUrlResponseDto extends BaseResponseDto<UrlEntity> {
  @ApiProperty()
  data: UrlEntity;

  constructor(url: UrlEntity) {
    super();
    this.data = url;
  }
}
