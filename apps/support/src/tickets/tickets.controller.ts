import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Query,
  ParseUUIDPipe,
} from '@nestjs/common';
import { TicketsService } from './tickets.service';
import { CreateTicketDto } from './dto/create-ticket.dto';

@Controller('tickets')
export class TicketsController {
  constructor(private readonly tickets: TicketsService) {}

  @Post()
  create(@Body() body: CreateTicketDto) {
    return this.tickets.create(body);
  }

  @Get()
  find(@Query() query: Record<string, unknown>) {
    return this.tickets.fetch(query);
  }

  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.tickets.findById(id);
  }

  @Get(':id/messages/')
  messages(@Param('id', ParseUUIDPipe) id: string) {
    return this.tickets.findWithMessages(id);
  }
}
