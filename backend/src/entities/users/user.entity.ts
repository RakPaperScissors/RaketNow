import { timestamp } from 'rxjs';
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Users {
    @PrimaryGeneratedColumn({ type: 'int', unsigned: true })
    uid: number;

    @Column({ type: 'varchar', length: 255 })
    email: string;

    @Column({ type: 'varchar', length: 255 })
    password: string;

    @Column({ type: 'varchar', length: 255, nullable: true })
    name: string;

    @Column({ type: 'boolean'})
    role: boolean;

    @Column({ type: 'varchar', length: 50, nullable: true})
    authProvider: string;

    @Column({ type: 'varchar'})
    providerId: string;

    @Column({ type: 'varchar', length: 255, nullable: true })
    profilePicture: string;

    @Column({ type: 'timestamp' })
    lastActive: Date;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    createdAt: Date;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    deletedAt: Date;
}