import { Users } from "./user.entity";
export declare class RaketistaProfile extends Users {
    bio: string;
    isVerified: boolean;
    aveResponseTime: number;
    isAutoReplyEnabled: boolean;
    autoReplyMessage: string;
}
