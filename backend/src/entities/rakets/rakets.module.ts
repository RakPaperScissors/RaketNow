import { Module } from '@nestjs/common';
import { RaketsService } from './rakets.service';
import { RaketsController } from './rakets.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Raket } from './entities/raket.entity';
import { Users } from '../user/entities/user.entity';
import { RaketApplication } from '../raket-application/entities/raket-application.entity';
import { RaketApplicationModule } from '../raket-application/raket-application.module';
import { Notification } from '../notification/entities/notification.entity';
import { NotificationModule } from '../notification/notification.module';
import { RaketPictures } from '../raket-pictures/entities/raket-picture.entity';
import { MinioClientProvider } from 'src/minio/minio-client.provider';
import { MinioModule } from 'src/minio/minio.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Raket, Users, RaketApplication, Notification, RaketPictures]),
    RaketApplicationModule, NotificationModule, MinioModule,
  ],
  controllers: [RaketsController],
  providers: [RaketsService, TypeOrmModule],
})
export class RaketsModule {}
