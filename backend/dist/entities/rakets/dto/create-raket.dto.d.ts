import { Users } from "src/entities/user/entities/user.entity";
import { RaketStatus } from "../entities/raket.entity";
export declare class CreateRaketDto {
    user: Users["uid"];
    title: string;
    description: string;
    status: RaketStatus;
    budget: number;
    dateCreated: Date;
    completedAt: Date;
}
