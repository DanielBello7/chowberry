import { Module } from '@nestjs/common';
import { WinstonModule } from '@app/winston';
import { RmqModule } from '@app/rmq';
import { FINANCE_CONSTANTS } from '@app/constants';

@Module({
    imports: [
        WinstonModule.register({ dir: FINANCE_CONSTANTS.LOG_PATH }),
        RmqModule.register({
            name: FINANCE_CONSTANTS.SERVICE,
            qtle: FINANCE_CONSTANTS.RABBIT_QUEUE_TITLE,
            urls: FINANCE_CONSTANTS.RABBIT_URI,
        }),
    ],
    controllers: [],
    providers: [],
})
export class AppModule {}
