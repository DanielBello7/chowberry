import { SUPPORT_CONSTANTS } from '@app/constants';
import { RmqModule } from '@app/rmq';
import { WinstonModule } from '@app/winston';
import { Module } from '@nestjs/common';
import { TicketsModule } from './tickets/tickets.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MessageModule } from './message/message.module';
import { SupportGateway } from './support/support.gateway';
import { TicketSchema } from './tickets/schemas/ticket.schema';
import { MessageSchema } from './message/schemas/message.schema';
import { SupportModule } from './support/support.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: SUPPORT_CONSTANTS.DATABASE_HOST,
      port: SUPPORT_CONSTANTS.DATABASE_PORT,
      username: SUPPORT_CONSTANTS.DATABASE_USERNAME,
      password: SUPPORT_CONSTANTS.DATABASE_PASSWORD,
      database: SUPPORT_CONSTANTS.DATABASE_NAME,
      entities: [TicketSchema, MessageSchema],
      synchronize: true,
    }),
    WinstonModule.register({ dir: SUPPORT_CONSTANTS.LOG_PATH }),
    RmqModule.register({
      name: SUPPORT_CONSTANTS.SERVICE,
      qtle: SUPPORT_CONSTANTS.RABBIT_QUEUE_TITLE,
      urls: SUPPORT_CONSTANTS.RABBIT_URI,
    }),
    TicketsModule,
    MessageModule,
    SupportModule,
  ],
  controllers: [],
  providers: [SupportGateway],
})
export class AppModule {}
