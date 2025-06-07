export enum SUPPORT_GATEWAY {
  MESSAGE_TO_SERVER = 'message.outgoing', // for when the server is being notified of a new message from the client
  MESSAGE_TO_CLIENT = 'message.incoming', // for the client is being notified of a new message from the server
  TICKETS_TO_SERVER = 'tickets.outgoing', // for when the server is being notified of a new ticket from the client
  TICKETS_TO_CLIENT = 'tickets.incoming', // for when clients are being notified of a new ticket from the server
  TICKETS_CHANGE_TO_SERVER = 'tickets.change.s', // for when the server is being alerted of a ticket change from client
  TICKETS_CHANGE_TO_CLIENT = 'tickets.s.change', // for when clients are notified of tickets status change from server
  EXCEPTION_TO_CLIENT = 'exceptions', // for when clients are being notified of errors from the server
  ADMINS_ROOM = 'admins', // room for all admins in the application
}
