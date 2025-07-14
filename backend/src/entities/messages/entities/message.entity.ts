import { Entity, PrimaryColumn, Column, ManyToOne, JoinColumn, CreateDateColumn } from "typeorm";
import { Users } from "src/entities/user/entities/user.entity";
import { Conversation } from "src/entities/conversation/entities/conversation.entity";

@Entity({ name: "messages" })
export class Message {
  @PrimaryColumn({ type: "uuid", default: () => "uuid_generate_v4()" })
  id: string;

  @Column({ name: "conversation_id", type: "uuid" })
  conversationId: string;
  @ManyToOne(() => Conversation, (conversation) => conversation.messages, {nullable: false, onDelete: "CASCADE",})
  @JoinColumn({ name: "conversation_id" })
  conversation: Conversation;

  @Column({ name: "sender_id", type: "uuid" })
  senderId: string;

  @ManyToOne(() => Users, { nullable: false })
  @JoinColumn({ name: "sender_id" })
  sender: Users;

  @Column({ type: "text" })
  content: string;

  @CreateDateColumn({ name: "created_at", type: "timestamptz" })
  createdAt: Date;

  @Column({ name: "read_at", type: "timestamptz", nullable: true })
  readAt: Date | null;
}
