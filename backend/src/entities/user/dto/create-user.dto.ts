import { IsDate, isDate, IsEmail } from "class-validator";
import { userRole } from "../entities/user.entity";

export class CreateUserDto {
    @IsEmail()
    email: string

    password: string
    
    firstName: string;

    lastName: string;

    role: userRole

    authProvider: string

    providerId: string

    profilePicture: string

    @IsDate()
    lastActive: Date

    @IsDate()
    createdAt: Date

    @IsDate()
    deletedAt: Date
}
