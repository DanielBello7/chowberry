import { ArgumentMetadata, BadRequestException, PipeTransform } from '@nestjs/common';
import { isMongoId } from 'class-validator';

export class ParseMongoIdPipe implements PipeTransform {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    transform(value: any, _metadata: ArgumentMetadata) {
        if (!isMongoId(value)) {
            throw new BadRequestException('Invalid MongoDB ObjectId format');
        } else return String(value);
    }
}
