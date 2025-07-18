import { Controller, Post, UploadedFile, UseInterceptors, Inject } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { S3 } from 'aws-sdk';
import { v4 as uuid } from 'uuid';
import { Express } from 'express';

@Controller('profile')
export class ProfileController {
    constructor(@Inject('MINIO_CLIENT') private readonly minioClient: S3) {}

    @Post('upload')
    @UseInterceptors(FileInterceptor('file'))
    async uploadProfilePicture(@UploadedFile() file: Express.Multer.File) {
        const fileExtension = file.originalname.split('.').pop();
        const key = `profile-pictures/${uuid()}.${fileExtension}`;

        await this.minioClient
        .putObject({
            Bucket: 'user-profile-pictures',
            Key: key,
            Body: file.buffer,
            ContentType: file.mimetype,
        })
        .promise();

        // Example response
        return {
        imageUrl: `http://localhost:9000/profile-pictures/${key}`,
        imageKey: key,
        };
    }
}