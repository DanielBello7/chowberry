import { DynamicModule, Global, Module } from '@nestjs/common';
import { RmqService } from './rmq.service';
import { ClientsModule, Transport } from '@nestjs/microservices';

export interface RmqModuleOptions {
    name: string;
    urls: string;
    qtle: string;
}

@Global()
@Module({
    exports: [RmqService],
    providers: [RmqService],
})
export class RmqModule {
    static register({ name, urls, qtle }: RmqModuleOptions): DynamicModule {
        return {
            module: RmqModule,
            global: true,
            imports: [
                ClientsModule.registerAsync([
                    {
                        name,
                        useFactory: () => ({
                            transport: Transport.RMQ,
                            options: {
                                urls: [urls],
                                queue: qtle,
                                socketOptions: {
                                    frameMax: 131072,
                                },
                            },
                        }),
                    },
                ]),
            ],
            exports: [ClientsModule],
        };
    }
}
