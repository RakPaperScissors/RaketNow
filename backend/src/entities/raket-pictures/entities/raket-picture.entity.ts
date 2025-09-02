import { Raket } from "../../rakets/entities/raket.entity";

import {
  Entity,
  Column,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
  PrimaryGeneratedColumn
} from 'typeorm';

@Entity({ name: 'raketPictures' })
export class RaketPictures {

    @PrimaryGeneratedColumn({ type: 'int', unsigned: true })
    id: number;

    @Column({ name: 'raket_id', type: 'uuid' })
    raketId: string;
    @ManyToOne(() => Raket, raket => raket.pictures, { nullable: false, onDelete: 'CASCADE' })
    @JoinColumn({ name: 'raket_id' })
    raket: Raket;

    @Column({ name: 'image_url', type: 'text' })
    imageUrl: string;

    @Column({ name: 'display_order', type: 'integer', default: 0 })
    displayOrder: number;

    @CreateDateColumn({ name: 'created_at', type: 'timestamptz' })
    createdAt: Date;
}