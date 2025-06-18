import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Users } from '../users/user.entity';

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

    @Column({ type: 'enum', enum: ['open', 'in_progress', 'completed', 'cancelled'] })
    status: string;

    @Column({ type: 'float', precision: 5 })
    budget: number;

    // Not sure yet on how to handle this --
    //@Column()
    //acceptedRaketistaId: number;

    @Column({ type: 'timestamp' })
    dateCreated: Date;

    @Column({ type: 'timestamp' })
    completedAt: Date;
}