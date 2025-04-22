import { DynamicModule, Module } from '@nestjs/common';
import { CloudinaryService } from './cloudinary.service';
import { IFileServiceType } from '@app/commons';

export type CloudinaryConfig = {
    CLOUDINARY_NAME: string;
    CLOUDINARY_KEY: string;
    CLOUDINARY_SECRET: string;
};

@Module({})
export class CloudinaryModule {
    static register(data: CloudinaryConfig): DynamicModule {
        return {
            exports: [IFileServiceType],
            providers: [
                {
                    provide: 'CLOUDINARY',
                    useValue: data,
                },
                {
                    useClass: CloudinaryService,
                    provide: IFileServiceType,
                },
            ],
            module: CloudinaryModule,
        };
    }
}
