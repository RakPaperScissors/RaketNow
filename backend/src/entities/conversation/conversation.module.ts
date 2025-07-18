import { Module } from '@nestjs/common';
import { ConversationService } from './conversation.service';
import { ConversationController } from './conversation.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Conversation } from './entities/conversation.entity';
import { Users } from '../user/entities/user.entity';
import { AuthModule } from 'src/auth/auth.module';
import { ConversationGateway } from './conersation.gateway';
import { MessageModule } from '../message/message.module';
import { Message } from '../message/entities/message.entity';
import { MessageService } from '../message/message.service';

@Module({
  imports: [TypeOrmModule.forFeature([Conversation, Users, Message]), MessageModule, AuthModule],
  controllers: [ConversationController],
  providers: [ConversationGateway, ConversationService, MessageService],
})
export class ConversationModule {}
