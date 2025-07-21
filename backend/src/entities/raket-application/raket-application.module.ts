import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RaketApplication } from './entities/raket-application.entity';
import { RaketApplicationService } from './raket-application.service';
import { RaketApplicationController } from './raket-application.controller';
import { UserModule } from '../user/user.module';
import { Notification } from '../notification/entities/notification.entity'; // <-- import Notification
import { Raket } from '../rakets/entities/raket.entity';
import { Users } from '../user/entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([RaketApplication, Notification, Raket, Users]), UserModule],
  providers: [RaketApplicationService],
  controllers: [RaketApplicationController],
  exports: [RaketApplicationService],
})
export class RaketApplicationModule {}
