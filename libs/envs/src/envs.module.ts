import { Module } from '@nestjs/common';
import { EnvsService } from './envs.service';

@Module({
  providers: [EnvsService],
  exports: [EnvsService],
})
export class EnvsModule {}
