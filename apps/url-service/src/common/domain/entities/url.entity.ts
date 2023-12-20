import { ApiProperty, OmitType } from '@nestjs/swagger';
import { BaseEntity } from '@shorten-url/base-service';
import { Column, Entity } from 'typeorm';

@Entity('url')
export class UrlEntity extends OmitType(BaseEntity, ['updatedAt']) {
  @ApiProperty()
  @Column()
  url: string;

  @ApiProperty()
  @Column({ name: 'shorten_url' })
  shortenUrl: string;
}
