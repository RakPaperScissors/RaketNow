import { userRole } from "../entities/user.entity";
export declare class CreateUserDto {
    email: string;
    password: string;
    name: string;
    role: userRole;
    authProvider: string;
    providerId: string;
    profilePicture: string;
    lastActive: Date;
    createdAt: Date;
    deletedAt: Date;
}
