import { Module } from '@nestjs/common';
import { MessageService } from './message.service';
import { MessageController } from './message.controller';
import { TicketsModule } from '../tickets/tickets.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MessageSchema } from './schemas/message.schema';

@Module({
  imports: [TypeOrmModule.forFeature([MessageSchema]), TicketsModule],
  providers: [MessageService],
  controllers: [MessageController],
  exports: [MessageService],
})
export class MessageModule {}
