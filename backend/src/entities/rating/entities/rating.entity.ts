import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToOne,
  JoinColumn
} from 'typeorm';
import { Raket } from '../../rakets/entities/raket.entity';
import { Users } from '../../../entities/user/entities/user.entity';

@Entity()
export class Rating {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'int', width: 1 })
  rating: number;

  @ManyToOne(() => Users, { eager: true })
  user: Users;

  @OneToOne(() => Raket, raket => raket.rating)
  @JoinColumn()
  raket: Raket;

  @Column({ nullable: false })
  raketistaId: number;
}
