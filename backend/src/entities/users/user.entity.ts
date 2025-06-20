import { Entity, PrimaryGeneratedColumn, Column, TableInheritance, OneToMany, ManyToMany, ManyToOne, CreateDateColumn } from 'typeorm';
import { Raket } from '../rakets/rakets.entity';
export enum userRole {
    CLIENT = 'client',
    RAKETISTA = 'raketista',
    ORGANIZATION = 'organization',
}

@Entity()
@TableInheritance({ column: { type: 'varchar', name: 'type' } })
export class Users {
    @PrimaryGeneratedColumn({ type: 'int', unsigned: true })
    uid: number;

    @Column({ type: 'varchar', length: 255, unique: true })
    email: string;

    @Column({ type: 'varchar', length: 255, nullable: true })
    password?: string;

    @Column({ type: 'varchar', length: 255, nullable: false })
    name: string;

    @Column({ type: 'enum', enum: userRole})
    role: userRole;

    @Column()
    authProvider: 'local' | 'google' | 'facebook';

    @Column({ type: 'varchar', nullable: false, unique: true })
    providerId: string;

    @Column({ type: 'varchar', length: 255, nullable: true })
    profilePicture: string;

    @Column({ type: 'timestamp', nullable: true })
    lastActive?: Date;

    @CreateDateColumn()
    createdAt: Date;

    @Column({ type: 'timestamp', nullable: true })
    deletedAt?: Date;

    // Connection to Raket entity
    @OneToMany(() => Raket, raket => raket.user)
    rakets: Raket[];
}