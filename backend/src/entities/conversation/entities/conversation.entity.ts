import { Message } from "src/entities/message/entities/message.entity";
import { Users } from "src/entities/user/entities/user.entity";
import {
  Entity,
  PrimaryColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToMany,
  JoinTable,
  OneToMany,
} from "typeorm";
@Entity({ name: "conversations" })
export class Conversation {
  @PrimaryColumn({ type: "uuid", default: () => "uuid_generate_v4()" })
  id: string;

  @ManyToMany(() => Users, (user) => user.conversations, {
    onDelete: "CASCADE",
  })
  @JoinTable({
    name: "conversation_participants",
    joinColumn: {
      name: "conversation_id",
      referencedColumnName: "id",
    },
    inverseJoinColumn: {
      name: "user_uid",
      referencedColumnName: "uid",
    },
  })
  participants: Users[];

  @OneToMany(() => Message, (message) => message.conversation)
  messages: Message[];

  @CreateDateColumn({ name: "created_at", type: "timestamptz" })
  createdAt: Date;

  @UpdateDateColumn({ name: "updated_at", type: "timestamptz" })
  updatedAt: Date;
}
