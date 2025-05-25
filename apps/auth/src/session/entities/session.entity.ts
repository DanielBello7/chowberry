import { SESSION } from '@app/types/auth/session.types';
export class Session implements SESSION {
  _id: string;
  account: string;
  token: string;
  refresh: string;
  expiresAt: string;
  createdAt: string;
  updatedAt: string;
}
