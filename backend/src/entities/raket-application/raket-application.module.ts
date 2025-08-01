import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RaketApplication } from './entities/raket-application.entity';
import { RaketApplicationService } from './raket-application.service';
import { RaketApplicationController } from './raket-application.controller';
import { UserModule } from '../user/user.module';
import { Notification } from '../notification/entities/notification.entity'; // <-- import Notification
import { Raket } from '../rakets/entities/raket.entity';
import { Users } from '../user/entities/user.entity';
import { ConversationModule } from '../conversation/conversation.module';
import { ConversationService } from '../conversation/conversation.service';
import { Conversation } from '../conversation/entities/conversation.entity';

@Module({
  imports: [TypeOrmModule.forFeature([RaketApplication, Notification, Raket, Users, Conversation]), UserModule, ConversationModule],
  providers: [RaketApplicationService, ConversationService],
  controllers: [RaketApplicationController],
  exports: [RaketApplicationService, TypeOrmModule],
})
export class RaketApplicationModule {}
