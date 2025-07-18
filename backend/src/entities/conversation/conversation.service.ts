import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { Conversation } from './entities/conversation.entity';
import { CreateConversationDto } from './dto/create-conversation.dto';
import { Users } from '../user/entities/user.entity';

@Injectable()
export class ConversationService {
  constructor(
    @InjectRepository(Conversation)
    private readonly conversationRepository: Repository<Conversation>,
    @InjectRepository(Users)
    private readonly userRepository: Repository<Users>,
  ) {}

  async create(createConversationDto: CreateConversationDto): Promise<Conversation> {
    const participants = await this.userRepository.findBy({
      uid: In(createConversationDto.participantIds),
    });

    if (participants.length !== createConversationDto.participantIds.length) {
      throw new NotFoundException('One or more participants not found.');
    }

    const newConversation = this.conversationRepository.create({ participants });
    return this.conversationRepository.save(newConversation);
  }

  async getConversationsForUser(userId: string) {
    const conversations = await this.conversationRepository
      .createQueryBuilder('conversation')
      .leftJoinAndSelect('conversation.participants', 'participant')
      .leftJoinAndMapOne(
        'conversation.lastMessage',
        'message',
        'lastMessage',
        'lastMessage.id = (SELECT id FROM message WHERE "conversationId" = conversation.id ORDER BY "createdAt" DESC LIMIT 1)',
      )
      .where('participant.id = :userId', { userId })
      .orderBy('lastMessage.createdAt', 'DESC')
      .getMany();

    return conversations;
  }
}