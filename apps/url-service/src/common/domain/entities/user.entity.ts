import { ApiProperty, PickType } from '@nestjs/swagger';
import { BaseEntity } from '@shorten-url/base-service';
import { Column, Entity } from 'typeorm';

@Entity('user')
export class UserEntity extends PickType(BaseEntity, ['id']) {
  @ApiProperty()
  @Column({ unique: true })
  email: string;
}
