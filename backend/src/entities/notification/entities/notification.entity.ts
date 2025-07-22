import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Users } from '../../user/entities/user.entity';
import { RaketApplication } from '../../raket-application/entities/raket-application.entity';

@Entity()
export class Notification {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Users, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'userId', referencedColumnName: 'uid' })
  user: Users;

  @Column()
  message: string;

  @Column({ default: false })
  isRead: boolean;

  @ManyToOne(() => RaketApplication, { nullable: true })
  @JoinColumn({ name: 'raketApplicationId', referencedColumnName: 'applicationId' })
  raketApplication?: RaketApplication;

  @Column({ default: false })
  actionable?: boolean;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;
}
