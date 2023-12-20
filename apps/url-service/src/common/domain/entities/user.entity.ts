import { ApiProperty, PickType } from '@nestjs/swagger';
import { BaseEntity } from '@shorten-url/base-service';
import { Column, Entity, OneToMany } from 'typeorm';

import { UrlEntity } from '@/common/domain/entities/url.entity';

@Entity('user')
export class UserEntity extends PickType(BaseEntity, ['id']) {
  @ApiProperty()
  @Column({ unique: true })
  email: string;

  @OneToMany(() => UrlEntity, (url) => url.user)
  urls: UrlEntity[];
}
