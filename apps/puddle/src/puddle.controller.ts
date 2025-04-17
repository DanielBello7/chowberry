import { Controller, Get } from '@nestjs/common';
import { PuddleService } from './puddle.service';

@Controller()
export class PuddleController {
  constructor(private readonly puddleService: PuddleService) {}

  @Get()
  getHello(): string {
    return this.puddleService.getHello();
  }
}
