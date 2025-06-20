import { ChildEntity, Column, ManyToMany,JoinTable } from "typeorm";
import { Users } from "./user.entity";
import {Skills} from "../raketistaProfile/skills.entity";

@ChildEntity()
export class RaketistaProfile extends Users {
    @Column({ type: 'varchar', length: 255 })
    bio: string;

    @Column({ type: 'boolean' })
    isRaketistaVerified: boolean;

    @Column()
    aveResponseTime: number;

    @Column({ type: 'boolean' })
    isAutoReplyEnabled: boolean;

    @Column({ type: 'varchar', length: 500, nullable: true })
    autoReplyMessage: string;

    // raketistaSkills joint table
    @ManyToMany(()=> Skills, skills => skills.raketistas)
    @JoinTable({
        name: 'raketistaSkills',
        joinColumn:{
            name: 'raketistaId',
            referencedColumnName: 'uid',
        },
        inverseJoinColumn: {
            name: 'skill_Id',
            referencedColumnName: 'skill_Id',
        } 
    })
    skills: Skills[];
}