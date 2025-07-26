import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { In, Repository } from "typeorm";
import { Conversation } from "./entities/conversation.entity";
import { CreateConversationDto } from "./dto/create-conversation.dto";
import { Users } from "../user/entities/user.entity";

@Injectable()
export class ConversationService {
  constructor(
    @InjectRepository(Conversation)
    private readonly conversationRepository: Repository<Conversation>,
    @InjectRepository(Users)
    private readonly userRepository: Repository<Users>
  ) {}

  async create(
    createConversationDto: CreateConversationDto,
    creatorId: number
  ): Promise<Conversation> {
    const allParticipantIds = [
      ...new Set([creatorId, ...createConversationDto.participantIds]),
    ];

    if (allParticipantIds.length < 2) {
      throw new BadRequestException(
        "A conversation requires at least two participants."
      );
    }

    const query = this.conversationRepository
      .createQueryBuilder("conversation")
      .leftJoin("conversation.participants", "user")
      .where("user.uid IN (:...allParticipantIds)", { allParticipantIds })
      .groupBy("conversation.id")
      .having("COUNT(user.uid) = :participantCount", {
        participantCount: allParticipantIds.length,
      });

    const existingConversation = await query.getOne();

    if (existingConversation) {
      const conversationToReturn = await this.conversationRepository.findOne({
        where: { id: existingConversation.id },
        relations: ["participants"],
      });

      if (!conversationToReturn) {
        throw new NotFoundException(
          "Could not retrieve existing conversation."
        );
      }

      return conversationToReturn;
    }

    const participants = await this.userRepository.findBy({
      uid: In(allParticipantIds),
    });

    if (participants.length !== allParticipantIds.length) {
      throw new NotFoundException("One or more participants not found.");
    }

    const newConversation = this.conversationRepository.create({
      participants,
    });

    return this.conversationRepository.save(newConversation);
  }

  async getConversationsForUser(userId: number): Promise<Conversation[]> {
    const conversationIdsQuery = this.conversationRepository
      .createQueryBuilder("conversation")
      .leftJoin("conversation.participants", "user")
      .where("user.uid = :userId", { userId })
      .select("conversation.id", "id");
    const conversationsRaw = await conversationIdsQuery.getRawMany();
    const conversationIds = conversationsRaw.map((c) => c.id);

    if (conversationIds.length === 0) {
      return [];
    }
    const conversations = await this.conversationRepository
      .createQueryBuilder("conversation")
      .leftJoinAndSelect("conversation.participants", "participant")
      .leftJoinAndMapOne(
        "conversation.lastMessage",
        "messages",
        "lastMessage",
        'lastMessage.id = (SELECT id FROM messages WHERE "conversation_id" = conversation.id ORDER BY "created_at" DESC LIMIT 1)'
      )
      .leftJoinAndSelect("lastMessage.sender", "lastMessageSender")
      .where("conversation.id IN (:...conversationIds)", { conversationIds })
      .orderBy("lastMessage.createdAt", "DESC", "NULLS LAST")
      .getMany();

    return conversations;
  }
}
