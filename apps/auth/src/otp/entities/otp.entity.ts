import { OTP_TYPE_ENUM } from '@app/enums/auth/otp.enum';
import { OTP } from '@app/types/auth/otp.types';
export class Otp implements OTP {
  _id: string;
  email: string;
  code: string;
  type: OTP_TYPE_ENUM;
  expiresAt: string;
  createdAt: string;
  updatedAt: string;
}
