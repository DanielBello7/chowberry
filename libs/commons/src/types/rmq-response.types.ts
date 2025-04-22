export type RmqFailedRes = {
    success: false;
    error: unknown;
    message: string;
};

export type RmqSuccessRes<T> = {
    success: true;
    result: T;
};

export type RmqRes<T> = RmqFailedRes | RmqSuccessRes<T>;
