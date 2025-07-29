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

@Module({
  imports: [
    TypeOrmModule.forFeature([Raket, Users, RaketApplication, Notification]),
    RaketApplicationModule, NotificationModule,
  ],
  controllers: [RaketsController],
  providers: [RaketsService, TypeOrmModule],
})
export class RaketsModule {}
