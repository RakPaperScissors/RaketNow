import { Users } from "./../../user/entities/user.entity";
import { RaketistaSkill } from "./../../raketista-skill/entities/raketista-skill.entity";
export declare class Raketista extends Users {
    bio: string;
    isRaketistaVerified: boolean;
    aveResponseTime: number;
    isAutoReplyEnabled: boolean;
    autoReplyMessage?: string;
    raketistaSkills: RaketistaSkill[];
}
