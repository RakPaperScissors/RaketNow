import {Entity, Column, PrimaryGeneratedColumn, OneToMany} from 'typeorm';
import {RaketistaSkill} from "./../../raketista-skill/entities/raketista-skill.entity";

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
}
