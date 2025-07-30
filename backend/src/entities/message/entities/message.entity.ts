import { Entity, PrimaryColumn, Column, CreateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Conversation } from '../../conversation/entities/conversation.entity';
import { Users } from '../../user/entities/user.entity';

@Entity({ name: 'messages' })
export class Message {
  @PrimaryColumn({ type: 'uuid', default: () => 'uuid_generate_v4()' })
  id: string;

  @Column({ name: 'conversation_id', type: 'uuid', nullable: false })
  conversationId: string;

  @ManyToOne(() => Conversation, (conversation) => conversation.messages, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'conversation_id' })
  conversation: Conversation;

  @Column({ name: 'sender_id', type: 'uuid', nullable: false })
  senderId: string; 
  @ManyToOne(() => Users, (user) => user.messages)
  @JoinColumn({ name: 'sender_id' })
  sender: Users;

  @Column({ type: 'text', nullable: false })
  text: string;

  @Column({ type: 'text', array: true, nullable: true })
  images: string[];

  @CreateDateColumn({ name: 'created_at', type: 'timestamptz' })
  createdAt: Date;

  @Column({ name: 'read_at', type: 'timestamptz', nullable: true })
  readAt: Date;
}