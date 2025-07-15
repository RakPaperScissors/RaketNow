import { Entity, PrimaryColumn, ManyToOne, JoinColumn, CreateDateColumn, OneToMany, Check, Unique, Column } from "typeorm";
import { Users } from "src/entities/user/entities/user.entity";
import { Message } from "src/entities/messages/entities/message.entity";

@Entity({ name: "conversations" })
@Unique(["participant1Id", "participant2Id"])
@Check(`"participant_1_id" < "participant_2_id"`)
export class Conversation {
  @PrimaryColumn({ type: "uuid", default: () => "uuid_generate_v4()" })
  id: string;

  @Column({ name: "participant_1_id", type: "uuid" })
  participant1Id: string;
  @ManyToOne(() => Users, { nullable: false, onDelete: "CASCADE" })
  @JoinColumn({ name: "participant_1_id" })
  participant1: Users;


  @Column({ name: "participant_2_id", type: "uuid" })
  participant2Id: string;
  @ManyToOne(() => Users, { nullable: false, onDelete: "CASCADE" })
  @JoinColumn({ name: "participant_2_id" })
  participant2: Users;


  @OneToMany(() => Message, (message) => message.conversation)
  messages: Message[];


  @CreateDateColumn({ name: "created_at", type: "timestamptz" })
  createdAt: Date;
}
