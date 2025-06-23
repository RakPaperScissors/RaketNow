import { Users } from "./../../user/entities/user.entity";
export declare class Raketista extends Users {
    bio: string;
    isRaketistaVerified: boolean;
    aveResponseTime: number;
    isAutoReplyEnabled: boolean;
    autoReplyMessage?: string;
}
