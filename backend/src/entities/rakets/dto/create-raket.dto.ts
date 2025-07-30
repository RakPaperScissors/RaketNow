import { Users } from "src/entities/user/entities/user.entity";
import { RaketStatus } from "../entities/raket.entity";
import { IsDate, IsEnum } from "class-validator";

export class CreateRaketDto {

    title: string;

    description: string;

    
    @IsEnum(RaketStatus)
    status?: RaketStatus;

    budget: number;

    @IsDate()
    dateCreated: Date;

    @IsDate()
    completedAt: Date;
}
