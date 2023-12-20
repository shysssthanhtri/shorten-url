import { ApiProperty } from '@nestjs/swagger';
import { BaseEntity } from '@shorten-url/base-service';
import { Exclude } from 'class-transformer';
import { Column, Entity } from 'typeorm';

@Entity('user')
export class UserEntity extends BaseEntity {
  @ApiProperty()
  @Column({ unique: true })
  email: string;

  @Exclude()
  @Column({ name: 'encrypted_password' })
  password: string;
}
