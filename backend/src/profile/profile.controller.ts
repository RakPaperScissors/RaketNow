import { Controller, Post, UploadedFile, UseInterceptors, Inject, Req } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { S3 } from 'aws-sdk';
import { v4 as uuid } from 'uuid';
import { Express } from 'express';
import { UserService } from 'src/entities/user/user.service';

@Controller('profile')
export class ProfileController {
    constructor(
        @Inject('MINIO_CLIENT') private readonly minioClient: S3,
        private readonly userService: UserService
    ) {}

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

        const userId = (Req as any).user?.uid || 10;
        await this.userService.updateProfilePicture(userId, key);
        
        return {
        imageUrl: `http://localhost:9000/profile-pictures/${key}`,
        imageKey: key,
        };
    }
}