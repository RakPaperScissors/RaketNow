import { RaketPictures } from 'src/entities/raket-pictures/entities/raket-picture.entity';
import { Users } from 'src/entities/user/entities/user.entity';
import { RaketApplication } from 'src/entities/raket-application/entities/raket-application.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, JoinColumn } from 'typeorm';
export enum RaketStatus {
    OPEN = 'open',
    IN_PROGRESS = 'in_progress',
    COMPLETED = 'completed',
    CANCELLED = 'cancelled',
}

@Entity()
export class Raket {
    @PrimaryGeneratedColumn()
    raketId: number;

    @ManyToOne(() => Users, { eager: false })
    @JoinColumn({ name: 'userId', referencedColumnName: 'uid' })
    user: Users;

    @Column({ type: 'varchar', length: 100 })
    title: string;

    @Column({ type: 'varchar', length: 500 })
    description: string;

    @Column({ type: 'enum', enum: RaketStatus, default: RaketStatus.OPEN })
    status: RaketStatus;

    @Column({ type: 'float' })
    budget: number;

    @OneToMany(() => RaketPictures, picture => picture.raket)
    pictures: RaketPictures[];

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    dateCreated: Date;

    @Column({ type: 'timestamp', nullable: true })
    completedAt: Date;

    @OneToMany(() => RaketApplication, application => application.raket)
    applications: RaketApplication[];

}