import { Module } from '@nestjs/common';
import { WinstonModule } from '@app/winston';
import { RmqModule } from '@app/rmq';
import { CHOWBERRY_CONSTANTS } from '@app/constants';

@Module({
    imports: [
        WinstonModule.register({ dir: CHOWBERRY_CONSTANTS.LOG_PATH }),
        RmqModule.register({
            name: CHOWBERRY_CONSTANTS.SERVICE,
            qtle: CHOWBERRY_CONSTANTS.RABBIT_QUEUE_TITLE,
            urls: CHOWBERRY_CONSTANTS.RABBIT_URI,
        }),
    ],
    controllers: [],
    providers: [],
})
export class AppModule {}
