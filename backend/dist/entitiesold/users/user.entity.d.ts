import { Raket } from '../rakets/rakets.entity';
export declare enum userRole {
    CLIENT = "client",
    RAKETISTA = "raketista",
    ORGANIZATION = "organization"
}
export declare class Users {
    uid: number;
    email: string;
    password?: string;
    name: string;
    role: userRole;
    authProvider: 'local' | 'google' | 'facebook';
    providerId: string;
    profilePicture: string;
    lastActive?: Date;
    createdAt: Date;
    deletedAt?: Date;
    rakets: Raket[];
}
