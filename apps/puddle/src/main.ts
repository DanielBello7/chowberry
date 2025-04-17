import { NestFactory } from '@nestjs/core';
import { PuddleModule } from './puddle.module';

async function bootstrap() {
  const app = await NestFactory.create(PuddleModule);
  await app.listen(process.env.port ?? 3000);
}
bootstrap();
