import { SUPPORT_CONSTANTS } from '@app/constants';
import { RmqModule } from '@app/rmq';
import { WinstonModule } from '@app/winston';
import { Module } from '@nestjs/common';

@Module({
    imports: [
        WinstonModule.register({ dir: SUPPORT_CONSTANTS.LOG_PATH }),
        RmqModule.register({
            name: SUPPORT_CONSTANTS.SERVICE,
            qtle: SUPPORT_CONSTANTS.RABBIT_QUEUE_TITLE,
            urls: SUPPORT_CONSTANTS.RABBIT_URI,
        }),
    ],
    controllers: [],
    providers: [],
})
export class AppModule {}
