import { DTO } from '@app/commons/types/dto.types';
import { Message } from '../entities/message.entity';
import { IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class CreateMessageDto implements DTO<Message> {
  @IsUUID()
  @IsString()
  @IsNotEmpty()
  account: string;

  @IsString()
  @IsNotEmpty()
  body: string;

  @IsUUID()
  @IsString()
  @IsNotEmpty()
  ticket: string;

  mediaType: string | undefined;
  media: string | undefined;
}
