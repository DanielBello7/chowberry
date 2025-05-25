import { ACCOUNT } from '@app/types/auth/account.types';
export class Account implements ACCOUNT {
  _id: string;
  name: string;
  email: string;
  password: string;
  isVerified: boolean;
  phone: string;
  isActive: boolean;
  avatar: string | undefined;
  createdAt: string;
  updatedAt: string;
}
