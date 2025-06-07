import { TICKET_STATUS_ENUM } from '@app/enums/support/ticket.enum';
import { TICKET } from '@app/types/support/ticket.types';
import { Message } from '../../message/entities/message.entity';

export class Ticket implements TICKET {
  _id: string;
  subject: string;
  body: string | undefined;
  admin: string | undefined;
  account: string;
  status: TICKET_STATUS_ENUM;
  lastMessage: string | undefined;
  createdAt: string;
  updatedAt: string;
  Messages?: Message[];
  LastMessage?: Message | undefined;
}
