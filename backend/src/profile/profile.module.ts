import { Module } from '@nestjs/common';
import { ProfileController } from './profile.controller';
import { MinioClientProvider } from '../minio/minio-client.provider';
import { UserModule } from 'src/entities/user/user.module';

@Module({
    imports: [UserModule],
    controllers: [ProfileController],
    providers: [MinioClientProvider,]
})
export class ProfileModule {}