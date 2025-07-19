import { Controller, Post, UploadedFile, UseInterceptors, Inject, Req } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { S3 } from 'aws-sdk';
import { v4 as uuid } from 'uuid';
import { Express } from 'express';
import { UserService } from 'src/entities/user/user.service';
import { Request } from 'express';

@Controller('profile')
export class ProfileController {
    constructor(
        @Inject('MINIO_CLIENT') private readonly minioClient: S3,
        private readonly userService: UserService
    ) {}

    @Post('upload')
    @UseInterceptors(FileInterceptor('file'))
    async uploadProfilePicture(@UploadedFile() file: Express.Multer.File, @Req() req: Request) {
        const userId = 10;

        // 1 - Get current profile picture (if any)
        const currentUser = await this.userService.findOne(userId);
        const currentImageKey = currentUser?.profilePicture;

        // 2 - Delete old image from bucket if it exists
        if (currentImageKey) {
            try {
                await this.minioClient
                    .deleteObject({
                        Bucket: 'user-profile-pictures',
                        Key: currentImageKey,
                    })
                    .promise();
            } catch (err) {
                console.warn('Failed to delete old profile picture.', err.message);
            }
        }

        // 3 - Upload new image
        const fileExtension = file.originalname.split('.').pop();
        const newKey = `profile-pictures/${uuid()}.${fileExtension}`;

        await this.minioClient
            .putObject({
                Bucket: 'user-profile-pictures',
                Key: newKey,
                Body: file.buffer,
                ContentType: file.mimetype,
            })
            .promise();

        // 4 - Update database
        await this.userService.updateProfilePicture(userId, newKey);
        
        return {
        imageUrl: `http://localhost:9000/profile-pictures/${newKey}`,
        imageKey: newKey,
        };
    }
}