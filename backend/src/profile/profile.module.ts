import { Module } from '@nestjs/common';
import { ProfileController } from './profile.controller';
import { MinioClientProvider } from '../minio/minio-client.provider';

@Module({
    controllers: [ProfileController],
    providers: [MinioClientProvider,]
})
export class ProfileModule {}