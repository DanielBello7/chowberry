import { DTO } from '@app/commons/types/dto.types';
import { Ticket } from '../entities/ticket.entity';
import { TICKET_STATUS_ENUM } from '@app/enums/support/ticket.enum';
import { IsEnum, IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class CreateTicketDto implements DTO<Ticket> {
  @IsString()
  @IsNotEmpty()
  subject: string;

  @IsString()
  @IsNotEmpty()
  body: string;

  @IsString()
  @IsUUID()
  @IsNotEmpty()
  account: string;

  status: TICKET_STATUS_ENUM;
  lastMessage: string;
  admin: string | undefined;
}
