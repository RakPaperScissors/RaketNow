import { Entity, PrimaryGeneratedColumn, Column, TableInheritance, OneToMany, ManyToMany, ManyToOne } from 'typeorm';
import { Conversation } from 'src/entities/conversation/entities/conversation.entity';
import { Message } from 'src/entities/message/entities/message.entity';
export enum userRole {
    CLIENT = 'client',
    RAKETISTA = 'raketista',
    ORGANIZATION = 'organization',
    ADMIN = 'admin',
}

@Entity()
@TableInheritance({ column: { type: 'varchar', name: 'type' } })
export class Users {
    @PrimaryGeneratedColumn({ type: 'int', unsigned: true })
    uid: number;

    @Column({ type: 'varchar', length: 255 })
    email: string;

    @Column({ type: 'varchar', length: 255, nullable: true})
    password: string;

    @Column({ type: 'varchar', length: 255, nullable: true })
    firstName: string;

    @Column({ type: 'varchar', length: 255, nullable: true })
    lastName: string;

    @Column({ type: 'enum', enum: userRole, default: userRole.CLIENT, })
    role: userRole;

    @Column({ type: 'varchar', length: 50, nullable: true})
    authProvider: string;

    @Column({ type: 'varchar', nullable: true })
    providerId: string;

    @Column({ type: 'varchar', length: 255, nullable: true })
    profilePicture: string;

    @Column({ type: 'timestamp', nullable: true })
    lastActive: Date;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    createdAt: Date;

    @Column({ type: 'timestamp', nullable: true })
    deletedAt: Date;

    @ManyToMany(() => Conversation, (conversation) => conversation.participants)
    conversations: Conversation[];

    @OneToMany(() => Message, message => message.sender)
    messages: Message[];
}