export abstract class IFileServiceType<T> {
    abstract savebase64(data: string): Promise<{ url: string } & T>;
    abstract savebinary(data: Buffer): Promise<{ url: string } & T>;
}
