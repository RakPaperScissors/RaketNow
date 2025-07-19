import { Controller, Post, UploadedFile, UseInterceptors, Inject, Req, UseGuards, Get, Request } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { S3 } from 'aws-sdk';
import { v4 as uuid } from 'uuid';
import { Express } from 'express';
import { UserService } from 'src/entities/user/user.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('profile')
export class ProfileController {
    constructor(
        @Inject('MINIO_CLIENT') private readonly minioClient: S3,
        private readonly userService: UserService
    ) {}

    @UseGuards(AuthGuard('jwt'))
    @Post('upload')
    @UseInterceptors(FileInterceptor('file'))
    async uploadProfilePicture(@UploadedFile() file: Express.Multer.File, @Request() req) {
        const userId = req.user.uid;

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
            message: 'Profile picture uploaded successfully.',
            imageUrl: `http://localhost:9000/profile-pictures/${newKey}`,
            imageKey: newKey,
            user: [
                userId,
                req.user.email,
                req.user.role,
            ],
        };
    }

    @Get('me/picture')
    @UseGuards(AuthGuard('jwt'))
    async getMyProfilePicture(@Request() req) {
        const user = await this.userService.findOne(req.user.uid);
        return {
            profilePicture: user?.profilePicture
                ? `http://localhost:3000/uploads/${user.profilePicture}`
                : 'default.png',
        };
    }
}