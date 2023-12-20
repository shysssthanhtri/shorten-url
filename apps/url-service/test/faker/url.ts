import { faker } from '@faker-js/faker';

import { UrlEntity } from '@/common/domain/entities/url.entity';

type Params = Partial<UrlEntity>;
export const genUrlTestData = (params?: Params): UrlEntity => {
  const url = new UrlEntity();
  url.url = faker.internet.url();
  url.shortenUrl = faker.internet.url();
  url.userId = faker.number.int({ max: 1000, min: 0 });
  Object.assign(url, params);
  return url;
};
