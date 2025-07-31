// src/ratings/entities/rating.entity.ts
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
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

  @ManyToOne(() => Raket, { onDelete: 'CASCADE' })
  raket: Raket;
}
