import { OTP_TYPE_ENUM } from '@app/enums/otp.enum';
import { Otp } from '../entities/otp.entity';
import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsString,
  MinLength,
} from 'class-validator';
import { DTO } from '@app/commons/types/dto.types';

export class CreateOtpDto implements DTO<Otp> {
  @IsNotEmpty()
  @IsEmail()
  @IsString()
  email: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(6)
  code: string;

  @IsNotEmpty()
  @IsString()
  @IsEnum(OTP_TYPE_ENUM)
  type: OTP_TYPE_ENUM;

  expiresAt: string;
}
