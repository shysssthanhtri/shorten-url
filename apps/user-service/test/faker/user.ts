import { faker } from '@faker-js/faker';

import { UserEntity } from '@/common/domain/entities/user.entity';

type Params = Partial<UserEntity>;
export const genUserTestData = (params?: Params): UserEntity => {
  const user = new UserEntity();
  user.email = faker.internet.email();
  user.password = faker.internet.password();
  Object.assign(user, params);
  return user;
};
