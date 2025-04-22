export type CONSTANTS = {
    NODE_ENV: 'development' | 'local' | 'production';
    isDev: boolean;
    DATABASE_URI: string;
    PORT: number;
    RABBIT_URI: string;
    RABBIT_QUEUE_TITLE: string; // static
    SERVICE: string; // static
    LOG_PATH: string; // comes from runtime
    ENV_FILE: string; // comes from runtime
};
