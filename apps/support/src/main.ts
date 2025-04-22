import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ExceptionFilter } from '@app/exceptions';
import { RmqService } from '@app/rmq';
import { WinstonService } from '@app/winston';
import { ValidationPipe } from '@nestjs/common';
import { SUPPORT_CONSTANTS } from '@app/constants';
import helmet from 'helmet';
import * as cookie from 'cookie-parser';
import * as compression from 'compression';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    const rmq = app.get<RmqService>(RmqService);
    const winston = app.get(WinstonService);
    const { httpAdapter } = app.get(HttpAdapterHost);
    app.useGlobalFilters(new ExceptionFilter(winston, httpAdapter));
    app.useGlobalPipes(new ValidationPipe());
    app.enableCors();
    app.use(cookie());
    app.use(compression());
    app.use(helmet());
    app.connectMicroservice(
        rmq.getOptions(SUPPORT_CONSTANTS.RABBIT_URI, SUPPORT_CONSTANTS.RABBIT_QUEUE_TITLE),
    );
    await app.startAllMicroservices();
    await app.listen(SUPPORT_CONSTANTS.PORT);
}
void bootstrap();
