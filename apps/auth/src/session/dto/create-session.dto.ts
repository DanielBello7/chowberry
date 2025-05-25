import { DTO } from '@app/commons/types/dto.types';
import { Session } from '../entities/session.entity';
import {
  IsDateString,
  IsJWT,
  IsMongoId,
  IsNotEmpty,
  IsString,
} from 'class-validator';

export class CreateSessionDto implements DTO<Session> {
  @IsString()
  @IsNotEmpty()
  @IsMongoId()
  account: string;

  @IsString()
  @IsNotEmpty()
  @IsJWT()
  token: string;

  @IsString()
  @IsNotEmpty()
  @IsJWT()
  refresh: string;

  @IsString()
  @IsNotEmpty()
  @IsDateString()
  expiresAt: string;
}
