import { ApiProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';
import { Column, Entity } from 'typeorm';

import { BaseEntity } from '@/common/domain/entities/base.entity';

@Entity('user')
export class UserEntity extends BaseEntity {
  @ApiProperty()
  @Column({ unique: true })
  email: string;

  @Exclude()
  @Column({ name: 'encrypted_password' })
  password: string;
}
