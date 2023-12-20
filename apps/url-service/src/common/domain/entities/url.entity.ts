import { ApiProperty, OmitType } from '@nestjs/swagger';
import { BaseEntity } from '@shorten-url/base-service';
import { Entity } from 'typeorm';

@Entity('url')
export class UrlEntity extends OmitType(BaseEntity, ['updatedAt']) {
  @ApiProperty()
  url: string;

  @ApiProperty({ name: 'shorten_url' })
  shortenUrl: string;
}
