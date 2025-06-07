import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  ParseUUIDPipe,
  Query,
} from '@nestjs/common';
import { MessageService } from './message.service';
import { CreateMessageDto } from './dto/create-message.dto';

@Controller('messages')
export class MessageController {
  constructor(private readonly msg: MessageService) {}
  @Post()
  create(@Body() body: CreateMessageDto) {
    return this.msg.create(body);
  }
  @Get()
  find(@Query() query: Record<string, unknown>) {
    return this.msg.fetch(query);
  }
  @Get(':id')
  findById(@Param('id', ParseUUIDPipe) id: string) {
    return this.msg.findById(id);
  }
}
