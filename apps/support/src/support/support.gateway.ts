import {
  ConnectedSocket,
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { TicketsService } from '../tickets/tickets.service';
import { MessageService } from '../message/message.service';
import { BadRequestException, OnModuleInit } from '@nestjs/common';
import { CreateMessageDto } from '../message/dto/create-message.dto';
import { of } from 'rxjs';
import { SUPPORT_GATEWAY } from '@app/enums';
import { CreateTicketDto } from '../tickets/dto/create-ticket.dto';
import { UpdateTicketDto } from '../tickets/dto/update-ticket.dto';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class SupportGateway implements OnModuleInit {
  constructor(
    private readonly tickets: TicketsService,
    private readonly message: MessageService,
  ) {}

  @WebSocketServer()
  private server: Server;

  private connections = new Set<string>();

  onModuleInit() {
    this.server.on('connection', async (socket) => {
      try {
        /** TODO: get token also from authentication and validate with auth service */
        const id =
          (socket.handshake.auth?.id as string) ||
          (socket.handshake.headers?.id as string);

        if (!id) throw new BadRequestException('Missing ID');

        if (this.connections.has(id)) {
          socket.disconnect();
          return;
        }

        await socket.join(id);
        this.connections.add(id);

        /** TODO: check if user is an admin and add to admin room */

        socket.on('disconnect', () => {
          this.connections.delete(id);
        });
      } catch (e: unknown) {
        socket.emit(SUPPORT_GATEWAY.EXCEPTION_TO_CLIENT, { e });
        socket.disconnect();
      }
    });
  }

  @SubscribeMessage(SUPPORT_GATEWAY.MESSAGE_TO_SERVER)
  async message_handler(
    @ConnectedSocket() _: Socket,
    @MessageBody() payload: { body: CreateMessageDto; to: string },
  ) {
    const response = await this.message.create(payload.body);
    this.server
      .to(payload.to)
      .emit(SUPPORT_GATEWAY.MESSAGE_TO_CLIENT, { response });
    return of({
      event: SUPPORT_GATEWAY.MESSAGE_TO_CLIENT,
      data: response,
    });
  }

  @SubscribeMessage(SUPPORT_GATEWAY.TICKETS_TO_SERVER)
  async ticket_handler(
    @ConnectedSocket() _: Socket,
    @MessageBody() payload: CreateTicketDto,
  ) {
    const response = await this.tickets.create(payload);
    this.server
      .to(SUPPORT_GATEWAY.ADMINS_ROOM)
      .emit(SUPPORT_GATEWAY.TICKETS_CHANGE_TO_CLIENT, { response });
    return of({
      event: SUPPORT_GATEWAY.TICKETS_CHANGE_TO_CLIENT,
      data: response,
    });
  }

  @SubscribeMessage(SUPPORT_GATEWAY.TICKETS_CHANGE_TO_SERVER)
  async ticket_change_handler(
    @ConnectedSocket() _: Socket,
    @MessageBody()
    payload: {
      id: string;
      body: UpdateTicketDto;
      to: string;
    },
  ) {
    const response = await this.tickets.update(payload.id, payload.body);
    this.server
      .to(payload.to)
      .emit(SUPPORT_GATEWAY.TICKETS_CHANGE_TO_CLIENT, { response });
    return of({
      event: SUPPORT_GATEWAY.TICKETS_CHANGE_TO_CLIENT,
      data: response,
    });
  }
}
