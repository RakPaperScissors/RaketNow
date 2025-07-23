import { IsDate, isDate, IsEmail, IsEnum, IsOptional, IsString } from "class-validator";
import { userRole } from "../entities/user.entity";

export class CreateUserDto {
    @IsEmail()
    email: string

    @IsOptional()
    @IsString()
    password?: string
    
    @IsString()
    firstName: string;

    @IsString()
    lastName: string;

    @IsOptional()
    @IsEnum(userRole)
    role?: userRole

    @IsOptional()
    @IsString()
    authProvider?: string

    @IsOptional()
    @IsString()
    providerId?: string

    @IsOptional()
    @IsString()
    profilePicture?: string

    @IsDate()
    @IsOptional()
    lastActive?: Date

    @IsDate()
    createdAt: Date

    @IsOptional()
    @IsDate()
    deletedAt?: Date

    @IsString()
    @IsOptional()
    organizationName?: string
}
