import { CONSTANTS } from './types.constants';

export const ADMIN_CONSTANTS: CONSTANTS = {
    DATABASE_URI: (process.env.DATABASE_URI as string) ?? '',
    ENV_FILE: (process.env.ENV_FILE as string) ?? '',
    isDev: (process.env.IS_DEV as string) === 'true',
    LOG_PATH: (process.env.LOG_PATH as string) ?? '',
    NODE_ENV: (process.env.NODE_ENV as CONSTANTS['NODE_ENV']) ?? '',
    PORT: !Number.isNaN(parseInt(process.env.PORT as string))
        ? parseInt(process.env.PORT as string)
        : 3000,
    RABBIT_URI: (process.env.RABBIT_URI as string) ?? '',
    RABBIT_QUEUE_TITLE: 'CHOWBERRY_ADMIN_QUEUE',
    SERVICE: 'CHOWBERRY_ADMIN',
};
