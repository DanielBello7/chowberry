import { CONSTANTS } from './types.constants';

type PUDDLE_CONSTANTS = CONSTANTS & {
    CLOUDINARY_NAME: string;
    CLOUDINARY_KEY: string;
    CLOUDINARY_SECRET: string;
};

export const PUDDLE_CONSTANTS: PUDDLE_CONSTANTS = {
    DATABASE_URI: (process.env.DATABASE_URI as string) ?? '',
    ENV_FILE: (process.env.ENV_FILE as string) ?? '',
    isDev: (process.env.IS_DEV as string) === 'true',
    LOG_PATH: (process.env.LOG_PATH as string) ?? '',
    NODE_ENV: (process.env.NODE_ENV as CONSTANTS['NODE_ENV']) ?? '',
    PORT: !Number.isNaN(parseInt(process.env.PORT as string))
        ? parseInt(process.env.PORT as string)
        : 3004,
    RABBIT_URI: (process.env.RABBIT_URI as string) ?? '',
    RABBIT_QUEUE_TITLE: 'PUDDLE_QUEUE',
    SERVICE: 'PUDDLE',
    CLOUDINARY_NAME: (process.env.CLOUDINARY_NAME as string) ?? '',
    CLOUDINARY_KEY: (process.env.CLOUDINARY_KEY as string) ?? '',
    CLOUDINARY_SECRET: (process.env.CLOUDINARY_SECRET as string) ?? '',
};
