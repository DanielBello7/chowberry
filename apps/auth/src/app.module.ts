import { AUTH_CONSTANTS } from '@app/constants';
import { RmqModule } from '@app/rmq';
import { WinstonModule } from '@app/winston';
import { Global, Module } from '@nestjs/common';
import { AccountModule } from './account/account.module';
import { SessionModule } from './session/session.module';
import { OtpModule } from './otp/otp.module';

@Global()
@Module({
    imports: [
        WinstonModule.register({ dir: AUTH_CONSTANTS.LOG_PATH }),
        RmqModule.register({
            name: AUTH_CONSTANTS.SERVICE,
            qtle: AUTH_CONSTANTS.RABBIT_QUEUE_TITLE,
            urls: AUTH_CONSTANTS.RABBIT_URI,
        }),
        AccountModule,
        SessionModule,
        OtpModule,
    ],
    providers: [],
    controllers: [],
})
export class AppModule {}
