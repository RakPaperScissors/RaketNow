import {Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToOne, JoinColumn} from 'typeorm';
import { Users } from './../../user/entities/user.entity';
import {Raket} from "./../../rakets/entities/raket.entity";
export enum jobHistoryType {
    // types of job history here
}
@Entity()
export class JobHistory {
    @PrimaryGeneratedColumn()
    jobId: number;

    @Column({type: 'varchar', length: 100, nullable: false})
    title: string;

    @Column({type: 'varchar', length: 100, nullable: false})
    description: string;

    @Column({type: 'enum', enum: jobHistoryType, nullable: false})
    historyType: jobHistoryType;

    @Column({type: 'date', nullable: false})
    jobDate: Date;

    //foreign key to raket table
    @OneToOne(() => Raket, raket => raket.raketId, {onDelete: 'CASCADE'})
    @JoinColumn({name: "raketId", referencedColumnName: "raketId"})
    raketId : Raket;

    // foreign key to users table
    @ManyToOne(()=> Users, user=> user.uid, {onDelete: 'CASCADE'})
    @JoinColumn({name: "raketistiaId", referencedColumnName: "uid"})
    raketistaId: Users;
}
