import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

import { UrlEntity } from '@/common/domain/entities/url.entity';

@Entity('user')
export class UserEntity {
  @ApiProperty()
  @PrimaryGeneratedColumn({ type: 'int', unsigned: true })
  id: number;

  @ApiProperty()
  @Column({ unique: true })
  email: string;

  @OneToMany(() => UrlEntity, (url) => url.user, {
    createForeignKeyConstraints: false,
  })
  urls: UrlEntity[];
}
