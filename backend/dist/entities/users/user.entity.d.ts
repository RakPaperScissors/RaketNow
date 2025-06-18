import { Raket } from '../rakets/rakets.entity';
export declare class Users {
    uid: number;
    email: string;
    password: string;
    name: string;
    role: boolean;
    authProvider: string;
    providerId: string;
    profilePicture: string;
    lastActive: Date;
    createdAt: Date;
    deletedAt: Date;
    rakets: Raket[];
}
