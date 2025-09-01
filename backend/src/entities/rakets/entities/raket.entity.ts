import { RaketPictures } from "../../raket-pictures/entities/raket-picture.entity";
import { Users } from '../../user/entities/user.entity';
import { RaketApplication } from '../../raket-application/entities/raket-application.entity';
import { Skills } from '../../skills/entities/skill.entity';
import { Rating } from '../../rating/entities/rating.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, OneToOne, ManyToMany, JoinColumn, JoinTable } from 'typeorm';
export enum RaketStatus {
    OPEN = 'open',
    IN_PROGRESS = 'in_progress',
    PENDING_CONFIRMATION = 'pending_confirmation',
    COMPLETED = 'completed',
    CANCELLED = 'cancelled',
}
export enum RaketCategory {
    MAINTENANCE_REPAIR = 'Maintenance & Repair',
    TECH_ELECTRONICS = 'Tech & Electronics',
    PERSONAL_HOME_CARE = 'Personal & Home Care',
    EVENTS_ENTERTAINMENT = 'Events & Entertainment',
    FOOD_BEVERAGE = 'Food & Beverage',
    EDUCATION_TUTORING = 'Education and Tutoring',
    GRAPHIC_DIGITAL_DESIGN = 'Graphic & Digital Design',
    BUSINESS_PROFESSIONAL_SERVICES = 'Business & Professional Services',
    AUTOMOTIVE = 'Automotive',
    MOVING_DELIVERY_SERVICES = 'Moving & Delivery Services',
}

@Entity()
export class Raket {
    @PrimaryGeneratedColumn()
    raketId: number;

    @ManyToOne(() => Users, { eager: false })
    @JoinColumn({ name: 'userUid', referencedColumnName: 'uid' })
    user: Users;

    @Column({ type: 'varchar', length: 100 })
    title: string;

    @Column({ type: 'varchar', length: 500 })
    description: string;

    @Column({ type: 'enum', enum: RaketCategory, nullable: true })
    category: RaketCategory;

    @Column({ type: 'enum', enum: RaketStatus, default: RaketStatus.OPEN })
    status: RaketStatus;

    @Column({ type: 'float' })
    budget: number;

    @OneToMany(() => RaketPictures, picture => picture.raket)
    pictures: RaketPictures[];

    @Column({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
    dateCreated: Date;

    @Column({ type: 'timestamp', nullable: true })
    completedAt?: Date;

    @OneToMany(() => RaketApplication, application => application.raket)
    applications: RaketApplication[];

    @ManyToMany(() => Skills, (skill) => skill.rakets, { cascade: true })
    @JoinTable()
    skills: Skills[];
    
    @OneToOne(() => Rating, rating => rating.raket)
    rating: Rating;

}