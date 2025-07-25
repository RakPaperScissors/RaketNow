import { Users } from "src/entities/user/entities/user.entity";
import { RaketStatus } from "../entities/raket.entity";
import { IsDate } from "class-validator";

export class CreateRaketDto {

    title: string;

    description: string;

    status: RaketStatus;

    budget: number;

    @IsDate()
    dateCreated: Date;

    @IsDate()
    completedAt: Date;
}
