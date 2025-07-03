import {Entity, Column, PrimaryGeneratedColumn, ManyToMany} from 'typeorm';
import {Raketista} from "./../../raketista/entities/raketista.entity";

@Entity()
export class Skills {
    @PrimaryGeneratedColumn()
    skill_Id: number;

    @Column()
    skillName: string;

    @Column()
    category: string;

    // @ManyToMany(() => Raketista, raketista => raketista.skills) // import skills.entity to raketista.entity
    // raketistas: Raketista[];
}
