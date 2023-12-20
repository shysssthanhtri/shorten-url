import * as path from 'path';

import { configSchema, TConfig } from '@/config/config.schema';
import { Env, getEnv } from '@/utils/get-env';

export class ConfigService {
  private static config: TConfig;

  private static initialized: boolean;

  static get<Key extends keyof TConfig>(key: Key): TConfig[Key] {
    if (!this.config) {
      throw new Error('Config is not initialized');
    }
    return this.config[key];
  }

  static async initialize() {
    if (this.initialized) return;
    const loadFunction = this.getLoadFunction();
    this.config = await loadFunction();
    this.initialized = true;
  }

  static getLoadFunction(): () => TConfig | Promise<TConfig> {
    const env = getEnv();
    switch (env) {
      case Env.TEST_LOCAL:
        return this._loadLocalTestEnv;
      case Env.PRODUCTION:
        return this._loadProductionEnv;
      default:
        return this._loadLocalEnv;
    }
  }

  static _loadLocalEnv(): TConfig {
    const envFilePath = path.join(__dirname, '../../../.env');
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    require('dotenv').config({
      path: envFilePath,
      override: true,
    });
    const _config = configSchema.parse(process.env);
    return _config;
  }

  static _loadLocalTestEnv(): TConfig {
    const envFilePath = path.join(__dirname, '../../.env_test');
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    require('dotenv').config({
      path: envFilePath,
      override: true,
    });
    const _config = configSchema.parse(process.env);
    return _config;
  }

  static _loadProductionEnv(): TConfig {
    return {};
  }
}
