import { Module } from '@nestjs/common';
import { TicketsModule } from '../tickets/tickets.module';
import { SupportGateway } from './support.gateway';
import { MessageModule } from '../message/message.module';

@Module({
  imports: [TicketsModule, MessageModule],
  providers: [SupportGateway],
})
export class SupportModule {}
