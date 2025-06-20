import { Users } from "./user.entity";
import { Skills } from "../raketistaProfile/skills.entity";
export declare class RaketistaProfile extends Users {
    bio: string;
    isRaketistaVerified: boolean;
    aveResponseTime: number;
    isAutoReplyEnabled: boolean;
    autoReplyMessage: string;
    skills: Skills[];
}
