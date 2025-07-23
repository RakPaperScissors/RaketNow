import { Injectable, NotFoundException, UnauthorizedException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { IsNull, Not, Repository } from "typeorm";
import { Message } from "./entities/message.entity";
import { CreateMessageDto } from "./dto/create-message.dto";
import { Conversation } from "../conversation/entities/conversation.entity";

interface PaginationOptions {
  page: number;
  limit: number;
}

@Injectable()
export class MessageService {
  constructor(
    @InjectRepository(Message)
    private readonly messageRepository: Repository<Message>,
    @InjectRepository(Conversation)
    private readonly conversationRepository: Repository<Conversation>
  ) {}

  async create(
    createMessageDto: CreateMessageDto,
    senderId: string
  ): Promise<Message> {
    const conversation = await this.conversationRepository.findOne({
      where: { id: createMessageDto.conversationId },
    });
    if (!conversation) {
      throw new NotFoundException("Conversation not found.");
    }

    const message = this.messageRepository.create({
      conversationId: createMessageDto.conversationId,
      senderId: senderId,
      text: createMessageDto.text,
      images: createMessageDto.images,
    });

    return this.messageRepository.save(message);
  }

  async getMessagesForConversation( conversationId: string, userId: string, paginationOptions: PaginationOptions ): Promise<any[]> {
    const conversation = await this.conversationRepository
      .createQueryBuilder('conversation')
      .leftJoin('conversation.participants', 'participant')
      .where('conversation.id = :conversationId', { conversationId })
      .andWhere('participant.uid = :userId', { userId })
      .getOne();

    if (!conversation) {
      throw new UnauthorizedException(
        "Cannot access messages for this conversation."
      );
    }

    const { page, limit } = paginationOptions;

    const messages = await this.messageRepository.find({
      where: { conversationId },
      relations: ["sender"],
      order: { createdAt: "DESC" },
      skip: (page - 1) * limit,
      take: limit,
    });

    return messages.map((message) => ({
      id: message.id,
      text: message.text,
      images: message.images,
      createdAt: message.createdAt,
      readAt: message.readAt,
      sender: {
        id: message.sender.uid,
        name: message.sender.lastName,
        profilePictureUrl: message.sender.profilePicture,
      },
    }));
  }

  async markMessagesAsRead(conversationId: string, readerId: string) {
    const result = await this.messageRepository.update(
      {
        conversationId: conversationId,
        senderId: Not(readerId),
        readAt: IsNull(),
      },
      {
        readAt: new Date(), // Set the read timestamp to now
      },
    );

     return { affectedCount: result.affected || 0 }; // Return how many rows were updated
  }
}
