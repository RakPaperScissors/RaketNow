import { Conversation } from 'src/entities/conversation/entities/conversation.entity';
import { Message } from 'src/entities/message/entities/message.entity';
export declare enum userRole {
    CLIENT = "client",
    RAKETISTA = "raketista",
    ORGANIZATION = "organization",
    ADMIN = "admin"
}
export declare class Users {
    uid: number;
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    role: userRole;
    authProvider: string;
    providerId: string;
    profilePicture: string;
    lastActive: Date;
    createdAt: Date;
    deletedAt: Date;
    conversations: Conversation[];
    messages: Message[];
}
