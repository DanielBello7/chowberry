import {
  IsEmail,
  IsNotEmpty,
  IsPhoneNumber,
  IsString,
  isStrongPassword,
  IsStrongPassword,
} from 'class-validator';
import { Account } from '../entities/account.entity';
import { DTO } from '@app/commons/types/dto.types';

export class CreateAccountDto implements DTO<Account> {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  @IsStrongPassword()
  password: string;

  @IsNotEmpty()
  @IsString()
  @IsPhoneNumber()
  phone: string;

  isVerified: boolean;
  avatar: string | undefined;
  isActive: boolean;
}
