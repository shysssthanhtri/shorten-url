export enum Env {
  DEVELOPMENT = 'development',
  TEST_LOCAL = 'test-local',
  PRODUCTION = 'production',
}

export const getEnv = (): Env => {
  const env = process.env.NODE_ENV ?? 'development';
  switch (env) {
    case 'test-local':
      return Env.TEST_LOCAL;
    case 'production':
      return Env.PRODUCTION;
    default:
      return Env.DEVELOPMENT;
  }
};
