/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { RmqFailedRes, RmqSuccessRes } from '@app/commons/types/rmq-response.types';
import { Injectable } from '@nestjs/common';
import { RmqContext, RmqOptions, Transport } from '@nestjs/microservices';

@Injectable()
export class RmqService {
    constructor() {}
    getOptions(url: string, queue: string, noAck: boolean = false): RmqOptions {
        return {
            transport: Transport.RMQ,
            options: {
                urls: [url],
                queue: queue,
                noAck,
                persistent: true,
            },
        };
    }

    ack(context: RmqContext) {
        const channel = context.getChannelRef();
        const originalMsg = context.getMessage();
        channel.ack(originalMsg);
    }

    async handle<T>(
        context: RmqContext,
        cb: () => Promise<T> | T,
        msg: string = 'Unidentified error occured',
    ) {
        try {
            const response = await cb();
            this.ack(context);
            const success: RmqSuccessRes<T> = {
                result: response,
                success: true,
            };
            return success;
        } catch (error) {
            this.ack(context);
            const response: RmqFailedRes = {
                error,
                message: msg,
                success: false,
            };
            return response;
        }
    }
}
