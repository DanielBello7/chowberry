import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateMessageDto } from './dto/create-message.dto';
import { UpdateMessageDto } from './dto/update-message.dto';
import { TicketsService } from '../tickets/tickets.service';
import { paginate } from '@app/commons/helpers/paginate.helpers';
import { InjectRepository } from '@nestjs/typeorm';
import { MessageSchema } from './schemas/message.schema';
import { Repository } from 'typeorm';

@Injectable()
export class MessageService {
  constructor(
    @InjectRepository(MessageSchema)
    private readonly message: Repository<MessageSchema>,
    private readonly tickets: TicketsService,
  ) {}

  async fetchByTicket(id: string) {
    return this.message.find({
      where: { ticket: id },
    });
  }

  async create(data: CreateMessageDto) {
    await this.tickets.findById(data.ticket);
    const response = this.message.create(data);
    return this.message.save(response);
  }

  async fetch(query: Record<string, unknown> = {}) {
    return paginate(query, this.message);
  }

  async findById(_id: string) {
    const response = await this.message.findOne({
      where: { _id },
    });
    if (!response) {
      throw new NotFoundException();
    }
    return response;
  }

  async update(_id: string, body: UpdateMessageDto) {
    await this.message.update(_id, body);
    return this.findById(_id);
  }

  async remove(_id: string) {
    const response = await this.findById(_id);
    await this.message.softDelete(_id);
    return response;
  }
}
