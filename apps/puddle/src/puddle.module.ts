import { Module } from '@nestjs/common';
import { PuddleController } from './puddle.controller';
import { PuddleService } from './puddle.service';

@Module({
  imports: [],
  controllers: [PuddleController],
  providers: [PuddleService],
})
export class PuddleModule {}
