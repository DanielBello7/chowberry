import { MESSAGE } from '@app/types/support/message.types';
export class Message implements MESSAGE {
  _id: string;
  account: string;
  body: string;
  media: string | undefined;
  mediaType: string | undefined;
  ticket: string;
  createdAt: string;
  updatedAt: string;
}
