import * as path from 'path';
import { DataSource, DataSourceOptions } from 'typeorm';

import { ConfigService } from '@/config/config.service';

export const getConnectionConfig = (): DataSourceOptions => {
  return {
    type: 'postgres',
    host: ConfigService.get('DATABASE_HOST'),
    port: +ConfigService.get('DATABASE_PORT'),
    username: ConfigService.get('DATABASE_USERNAME'),
    password: ConfigService.get('DATABASE_PASSWORD'),
    database: ConfigService.get('DATABASE_DATABASE'),
    migrations: [path.join(__dirname, '../migrations/*.{ts,js}')],
  };
};

const buildDataSource = async () => {
  await ConfigService.initialize();
  return new DataSource(getConnectionConfig());
};

export default buildDataSource();
