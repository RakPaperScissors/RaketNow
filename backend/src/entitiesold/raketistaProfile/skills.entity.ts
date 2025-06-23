import {Entity, Column, PrimaryGeneratedColumn, ManyToMany} from 'typeorm';
import {RaketistaProfile} from '../users/raketistaProfile.entity';

@Entity()
export class Skills {
    @PrimaryGeneratedColumn()
    skill_Id: number;

    @Column()
    skillName: string;

    @Column()
    category: string;

    @ManyToMany(() => RaketistaProfile, raketista => raketista.skills)
    raketistas: RaketistaProfile[];
}