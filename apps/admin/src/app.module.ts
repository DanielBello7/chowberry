import { ADMIN_CONSTANTS } from '@app/constants';
import { RmqModule } from '@app/rmq';
import { WinstonModule } from '@app/winston';
import { Global, Module } from '@nestjs/common';

@Global()
@Module({
    imports: [
        WinstonModule.register({ dir: ADMIN_CONSTANTS.LOG_PATH }),
        RmqModule.register({
            name: ADMIN_CONSTANTS.SERVICE,
            qtle: ADMIN_CONSTANTS.RABBIT_QUEUE_TITLE,
            urls: ADMIN_CONSTANTS.RABBIT_URI,
        }),
    ],
    controllers: [],
    providers: [],
})
export class AppModule {}
