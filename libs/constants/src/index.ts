import * as dotenv from 'dotenv';

dotenv.config({ path: process.env.ENV_FILE as string });

export * from './auth.constants';
