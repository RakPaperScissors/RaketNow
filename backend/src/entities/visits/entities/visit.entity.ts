import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from "typeorm";

@Entity()
export class Visit {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ nullable: true })
    sessionId: string;

    @Column({ nullable: true })
    userId: number;

    @CreateDateColumn()
    visitedAt: Date;
}
