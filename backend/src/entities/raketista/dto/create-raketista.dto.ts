import { IsString, IsEmail, MinLength, IsOptional } from "class-validator";

export class CreateRaketistaDto {
    @IsEmail()
    email: string;

    @IsString()
    @MinLength(6)
    password: string;

    @IsString()
    name: string;

    @IsOptional()
    @IsString()
    bio?: string;

}
