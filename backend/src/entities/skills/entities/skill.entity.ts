import {Entity, Column, PrimaryGeneratedColumn, OneToMany, ManyToMany} from 'typeorm';
import {RaketistaSkill} from "./../../raketista-skill/entities/raketista-skill.entity";
import { Raket } from "./../../rakets/entities/raket.entity";

@Entity()
export class Skills {
    @PrimaryGeneratedColumn()
    skill_Id: number;

    @Column()
    skillName: string;

    @Column()
    category: string;

    @OneToMany(() => RaketistaSkill, raketistaSkill => raketistaSkill.skill)
    raketistaSkills: RaketistaSkill[];

    @ManyToMany(() => Raket, raket => raket.skills)
    rakets: Raket[];
}
