import { IsString, IsOptional, IsEmail, MinLength } from "class-validator";
import { userRole } from "src/entities/user/entities/user.entity";

export class CreateOrganizationDto {
    @IsEmail()
    email: string;

    @IsString()
    @MinLength(6)
    password: string;

    @IsString()
    name: string;

    @IsString()
    orgName: string;

    readonly role: userRole = userRole.ORGANIZATION;
}
