import { Injectable } from '@nestjs/common';

@Injectable()
export class PuddleService {
  getHello(): string {
    return 'Hello World!';
  }
}
