import { RaketPictures } from 'src/entities/raket-pictures/entities/raket-picture.entity';
import { Users } from 'src/entities/user/entities/user.entity';
import { RaketApplication } from 'src/entities/raket-application/entities/raket-application.entity';
import { Skills } from 'src/entities/skills/entities/skill.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, ManyToMany, JoinColumn, JoinTable } from 'typeorm';
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

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    dateCreated: Date;

    @Column({ type: 'timestamp', nullable: true })
    completedAt: Date;

    @OneToMany(() => RaketApplication, application => application.raket)
    applications: RaketApplication[];

    @ManyToMany(() => Skills, { eager: true })
    @JoinTable({
        name: 'raketSkills',
        joinColumn: {
            name: 'raketId',
            referencedColumnName: 'raketId',
        },
        inverseJoinColumn: {
            name: 'skillId',
            referencedColumnName: 'skill_Id',
        },
    })
    skills: Skills[];
}