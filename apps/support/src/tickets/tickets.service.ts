import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTicketDto } from './dto/create-ticket.dto';
import { UpdateTicketDto } from './dto/update-ticket.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { TicketSchema } from './schemas/ticket.schema';
import { Repository } from 'typeorm';
import { Paginated } from '@app/commons/types/paginated.types';
import { Ticket } from './entities/ticket.entity';
import { paginate } from '@app/commons/helpers/paginate.helpers';

@Injectable()
export class TicketsService {
  constructor(
    @InjectRepository(TicketSchema)
    private readonly ticket: Repository<TicketSchema>,
  ) {}

  async create(data: CreateTicketDto) {
    const response = this.ticket.create(data);
    return this.ticket.save(response);
  }

  async fetch(
    query: Record<string, any> = {},
  ): Promise<Paginated<Ticket>> {
    return paginate(query, this.ticket, {
      relations: {
        LastMessage: true,
      },
    });
  }

  async get() {
    return this.ticket.find();
  }

  async findById(_id: string) {
    const response = await this.ticket.findOne({
      where: {
        _id,
      },
      relations: {
        LastMessage: true,
      },
    });
    if (!response) {
      throw new NotFoundException();
    }
    return response;
  }

  async findWithMessages(_id: string) {
    const response = await this.ticket.findOne({
      where: {
        _id,
      },
      relations: {
        Messages: true,
      },
    });
    if (!response) {
      throw new NotFoundException();
    }
    return response;
  }

  async update(_id: string, body: UpdateTicketDto) {
    const response = await this.ticket.update(_id, body);
    return this.findById(_id);
  }

  async remove(_id: string) {
    const response = await this.findById(_id);
    await this.ticket.softDelete({ _id });
    return response;
  }
}
