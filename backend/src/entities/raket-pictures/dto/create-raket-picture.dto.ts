import { IsDate, IsNotEmpty } from "class-validator";
import { Raket } from "src/entitiesold/rakets/rakets.entity";

export class CreateRaketPictureDto {
    raketId: Raket["racketId"];

    @IsDate()
    createdAt: Date;
}
