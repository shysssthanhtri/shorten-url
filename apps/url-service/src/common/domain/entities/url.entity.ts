import { ApiProperty, OmitType } from '@nestjs/swagger';
import { BaseEntity } from '@shorten-url/base-service';
import { Column, Entity, ManyToOne } from 'typeorm';

import { UserEntity } from '@/common/domain/entities/user.entity';

@Entity('url')
export class UrlEntity extends OmitType(BaseEntity, ['updatedAt']) {
  @ApiProperty()
  @Column()
  url: string;

  @ApiProperty()
  @Column({ name: 'shorten_url' })
  shortenUrl: string;

  @ApiProperty()
  @Column({ name: 'user_id' })
  userId: UserEntity['id'];

  @ManyToOne(() => UserEntity, (user) => user.urls)
  user: UserEntity;
}
