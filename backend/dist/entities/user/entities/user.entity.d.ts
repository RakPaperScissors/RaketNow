export declare enum userRole {
    CLIENT = "client",
    RAKETISTA = "raketista",
    ORGANIZATION = "organization",
    ADMIN = "admin"
}
export declare class Users {
    uid: number;
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    role: userRole;
    authProvider: string;
    providerId: string;
    profilePicture: string;
    lastActive: Date;
    createdAt: Date;
    deletedAt: Date;
}
