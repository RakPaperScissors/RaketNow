import { ChildEntity, Column, OneToMany } from "typeorm";
import { Users } from "./../../user/entities/user.entity";
import {RaketistaSkill} from "./../../raketista-skill/entities/raketista-skill.entity";

@ChildEntity()
export class Raketista extends Users {
    @Column({ type: 'varchar', length: 255, nullable: true })
    bio: string;

    @Column({ type: 'boolean' })
    isRaketistaVerified: boolean;

    @Column({ type: 'int', default: 0})
    aveResponseTime: number;

    @Column({ default: false })
    isAutoReplyEnabled: boolean;

    @Column({ type: 'varchar', length: 500, nullable: true })
    autoReplyMessage?: string;

    // raketistaSkills joint table
    @OneToMany(() => RaketistaSkill, raketistaSkill => raketistaSkill.raketista)
    raketistaSkills: RaketistaSkill[];
}