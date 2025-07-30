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
const USER_PROFILE_PIC_BASE_URL = "http://localhost:9000/user-profile-pictures/";

@Injectable()
export class MessageService {
  constructor (
    @InjectRepository(Message)
    private readonly messageRepository: Repository<Message>,
    @InjectRepository(Conversation)
    private readonly conversationRepository: Repository<Conversation>
  ) { }

  async create(
    createMessageDto: CreateMessageDto,
    senderId: string
  ): Promise<any> {
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

    const savedMessage = await this.messageRepository.save(message);

    const messageWithSender = await this.messageRepository.findOne({
      where: { id: savedMessage.id },
      relations: ['sender'], // Load the sender relationship
    });


    if (messageWithSender) {
      return {
        id: messageWithSender.id,
        text: messageWithSender.text,
        images: messageWithSender.images,
        createdAt: messageWithSender.createdAt,
        readAt: messageWithSender.readAt,
        conversationId: messageWithSender.conversationId, // Include conversationId if needed by frontend
        sender: { // This 'sender' object matches the frontend's expectation
          id: messageWithSender.sender.uid, // Use uid as per your Users entity
          name: messageWithSender.sender.lastName, // Or messageWithSender.sender.firstName if you prefer first name
          profilePicture: messageWithSender.sender.profilePicture, // Raw path from DB
          profilePictureUrl: messageWithSender.sender.profilePicture // Full URL
            ? `${USER_PROFILE_PIC_BASE_URL}${messageWithSender.sender.profilePicture}`
            : null, // Default avatar will be handled by frontend
        },
      };
    } else {
      // This case should ideally not happen if save was successful
      throw new NotFoundException('Could not retrieve created message with sender details.');
    }
  }

  async getMessagesForConversation(conversationId: string, userId: string, paginationOptions: PaginationOptions): Promise<any[]> {
    const conversation = await this.conversationRepository
      .createQueryBuilder("conversation")
      .leftJoin("conversation.participants", "participant")
      .where("conversation.id = :conversationId", { conversationId })
      .andWhere("participant.uid = :userId", { userId })
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

    return messages.map(message => ({
      id: message.id,
      text: message.text,
      images: message.images,
      createdAt: message.createdAt,
      readAt: message.readAt,
      conversationId: message.conversationId, // Include conversationId
      sender: {
        id: message.sender.uid, // Map 'uid' to 'id' for consistency with JWT payload
        name: message.sender.lastName, // Use lastName as you defined in your provided snippet
        profilePicture: message.sender.profilePicture, // The raw path
        profilePictureUrl: message.sender.profilePicture // The full URL for frontend display
          ? `${USER_PROFILE_PIC_BASE_URL}${message.sender.profilePicture}`
          : null, // Fallback to null, frontend will use default
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
