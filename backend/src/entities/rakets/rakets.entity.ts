import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToOne } from 'typeorm';
import { Users } from '../users/user.entity';
export enum RaketStatus {
    OPEN = 'open',
    IN_PROGRESS = 'in_progress',
    COMPLETED = 'completed',
    CANCELLED = 'cancelled',
}

@Entity()
export class Raket {
    @PrimaryGeneratedColumn()
    racketId: number;

    @ManyToOne(() => Users, user => user.rakets)
    user: Users;

    @Column({ type: 'varchar', length: 100 })
    title: string;

    @Column({ type: 'varchar', length: 500 })
    description: string;

    @Column({ type: 'enum', enum: RaketStatus })
    status: RaketStatus;

    @Column({ type: 'float' }) // Remove precision for float
    budget: number;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    dateCreated: Date;

    @Column({ type: 'timestamp', nullable: true })
    completedAt: Date;
}