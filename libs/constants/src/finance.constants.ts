import { CONSTANTS } from './types.constants';

type FINANCE_CONSTANT = CONSTANTS & {
    FL_PUBLIC: string;
    FL_SECRET: string;
};

export const FINANCE_CONSTANTS: FINANCE_CONSTANT = {
    DATABASE_URI: (process.env.DATABASE_URI as string) ?? '',
    ENV_FILE: (process.env.ENV_FILE as string) ?? '',
    isDev: (process.env.IS_DEV as string) === 'true',
    LOG_PATH: (process.env.LOG_PATH as string) ?? '',
    NODE_ENV: (process.env.NODE_ENV as CONSTANTS['NODE_ENV']) ?? '',
    PORT: !Number.isNaN(parseInt(process.env.PORT as string))
        ? parseInt(process.env.PORT as string)
        : 3003,
    RABBIT_URI: (process.env.RABBIT_URI as string) ?? '',
    RABBIT_QUEUE_TITLE: 'CHOWBERRY_FINANCE_QUEUE',
    SERVICE: 'CHOWBERRY_FINANCE',
    FL_PUBLIC: (process.env.FL_PUBLIC as string) ?? '',
    FL_SECRET: (process.env.FL_SECRET as string) ?? '',
};
