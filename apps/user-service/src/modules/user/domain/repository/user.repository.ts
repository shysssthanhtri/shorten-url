import { UserEntity } from '@/common/domain/entities/user.entity';

export abstract class UserRepository {
  abstract save(user: UserEntity): Promise<UserEntity>;
}
