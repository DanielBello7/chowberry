import { Module } from '@nestjs/common';
import { TicketsService } from './tickets.service';
import { TicketsController } from './tickets.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TicketSchema } from './schemas/ticket.schema';

@Module({
  imports: [TypeOrmModule.forFeature([TicketSchema])],
  providers: [TicketsService],
  exports: [TicketsService],
  controllers: [TicketsController],
})
export class TicketsModule {}
