import { z } from 'zod';

export const configSchema = z.object({
  DATABASE_HOST: z.string(),
  DATABASE_PORT: z.string(),
  DATABASE_USERNAME: z.string(),
  DATABASE_PASSWORD: z.string(),
  DATABASE_DATABASE: z.string(),
  PORT: z.string().default('3000'),
  SERVICE_PREFIX: z.string().default(''),
});
export type TConfig = z.infer<typeof configSchema>;
