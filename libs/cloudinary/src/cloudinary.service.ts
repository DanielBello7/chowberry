/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { Inject, Injectable } from '@nestjs/common';
import { CloudinaryConfig } from './cloudinary.module';
import { IFileServiceType } from '@app/commons/interfaces/file-module.interface';
import { isBase64 } from 'class-validator';
import { UploadApiResponse } from 'cloudinary';
import { v2 } from 'cloudinary';

@Injectable()
export class CloudinaryService extends IFileServiceType<UploadApiResponse> {
    constructor(
        @Inject('CLOUDINARY')
        private readonly config: CloudinaryConfig,
    ) {
        super();
        v2.config({
            cloud_name: this.config.CLOUDINARY_NAME,
            api_key: this.config.CLOUDINARY_KEY,
            api_secret: this.config.CLOUDINARY_SECRET,
        });
    }

    async savebase64(data: string) {
        const confirm = isBase64(data);
        if (!confirm) {
            throw new Error('file not base64');
        }
        try {
            return v2.uploader.upload(data, { resource_type: 'auto' });
        } catch (error) {
            throw new Error(`Cloudinary upload failed: ${error.message}`);
        }
    }

    async savebinary(data: Buffer) {
        try {
            const base64 = `data:image/jpeg;base64,${data.toString('base64')}`;
            return v2.uploader.upload(base64, { resource_type: 'auto' });
        } catch (error) {
            throw new Error(`Cloudinary upload failed: ${error.message}`);
        }
    }
}
