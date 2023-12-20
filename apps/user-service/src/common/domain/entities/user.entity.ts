import { BaseEntity } from '@/common/domain/entities/base.entity';

export class UserEntity extends BaseEntity {
  email: string;

  password: string;
}
