import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  Check,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
  OneToOne,
  PrimaryColumn,
} from 'typeorm';

import { Users } from '../users/user.entity';
import { Raket } from './rakets.entity';

@Entity({ name: 'reviews' })
@Check(`"clientId" <> "raketistaID"`)
export class Review {
  @PrimaryGeneratedColumn({ type: 'int', unsigned: true })
  uid: number;

  @Column({ name: 'clientId' })
  clientId: number;
  @ManyToOne(() => Users, user => user.uid, { nullable: false, onDelete: 'CASCADE' })
  @JoinColumn({ name: 'clientId' })
  client: Users;

  @Column({ name: 'raketistaID'})
  raketistaId: number;
  @ManyToOne(() => Users, user => user.uid, { nullable: false, onDelete: 'CASCADE' })
  @JoinColumn({ name: 'raketistaID' })
  raketista: Users;

  @Column({ name: 'raket_id', unique: true })
  raketId: number;

  @OneToOne(() => Raket, raket => raket.racketId, { nullable: false, onDelete: 'CASCADE' })
  @JoinColumn({ name: 'raket_id' })
  raket: Raket;

  @Column({ type: 'smallint' })
  @Check(`"rating" >= 1 AND "rating" <= 5`)
  rating: number;

  @Column({ type: 'text', nullable: true })
  comment: string;

  @CreateDateColumn({ name: 'created_at', type: 'timestamptz' })
  createdAt: Date;
}