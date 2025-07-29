import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn } from 'typeorm';
import { Users } from 'src/entities/user/entities/user.entity';
import { Raket } from 'src/entities/rakets/entities/raket.entity';

@Entity()
export class Rating {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'int' })
  rating: number;

  @Column({ type: 'text', nullable: true })
  review: string;

  @CreateDateColumn()
  createdAt: Date;

  @ManyToOne(() => Users, user => user.givenRatings)
  poster: Users;

  @ManyToOne(() => Users, user => user.receivedRatings)
  raketista: Users;

  @ManyToOne(() => Raket)
  raket: Raket;
}
