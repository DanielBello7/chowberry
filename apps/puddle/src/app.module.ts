import { PUDDLE_CONSTANTS } from '@app/constants';
import { RmqModule } from '@app/rmq';
import { WinstonModule } from '@app/winston';
import { Module } from '@nestjs/common';

@Module({
    imports: [
        WinstonModule.register({ dir: PUDDLE_CONSTANTS.LOG_PATH }),
        RmqModule.register({
            name: PUDDLE_CONSTANTS.SERVICE,
            qtle: PUDDLE_CONSTANTS.RABBIT_QUEUE_TITLE,
            urls: PUDDLE_CONSTANTS.RABBIT_URI,
        }),
    ],
    controllers: [],
    providers: [],
})
export class AppModule {}
