import { ApiProperty } from '@nestjs/swagger';
import { BaseEntity } from '@shorten-url/base-service';
import { Exclude } from 'class-transformer';
import { Column, Entity, Index, ManyToOne } from 'typeorm';

import { UserEntity } from '@/common/domain/entities/user.entity';

@Entity('url')
export class UrlEntity extends BaseEntity {
  @ApiProperty()
  @Column()
  url: string;

  @ApiProperty()
  @Column({ name: 'shorten_url' })
  shortenUrl: string;

  @ApiProperty()
  @Index()
  @Column({ name: 'user_id', type: Number })
  userId: UserEntity['id'];

  @Exclude()
  @ManyToOne(() => UserEntity, (user) => user.urls, {
    createForeignKeyConstraints: false,
  })
  user: UserEntity;
}
