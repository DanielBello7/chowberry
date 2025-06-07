import { CONSTANTS } from './types.constants';

export const USERS_CONSTANTS: CONSTANTS = {
  DATABASE_URI: (process.env.DATABASE_URI as string) ?? '',
  DATABASE_TYPE: (process.env.DATABASE_TYPE as string) ?? '',
  DATABASE_HOST: (process.env.DATABASE_HOST as string) ?? '',
  DATABASE_PORT: !Number.isNaN(
    parseInt(process.env.DATABASE_PORT as string),
  )
    ? parseInt(process.env.DATABASE_PORT as string)
    : 5432,
  DATABASE_USERNAME: (process.env.DATABASE_USERNAME as string) ?? '',
  DATABASE_PASSWORD: (process.env.DATABASE_PASSWORD as string) ?? '',
  DATABASE_NAME: (process.env.DATABASE_NAME as string) ?? '',
  ENV_FILE: (process.env.ENV_FILE as string) ?? '',
  isDev: (process.env.IS_DEV as string) === 'true',
  LOG_PATH: (process.env.LOG_PATH as string) ?? '',
  NODE_ENV: (process.env.NODE_ENV as CONSTANTS['NODE_ENV']) ?? '',
  PORT: !Number.isNaN(parseInt(process.env.PORT as string))
    ? parseInt(process.env.PORT as string)
    : 3006,
  RABBIT_URI: (process.env.RABBIT_URI as string) ?? '',
  RABBIT_QUEUE_TITLE: 'CHOWBERRY_USERS_QUEUE',
  SERVICE: 'CHOWBERRY_USERS',
};
