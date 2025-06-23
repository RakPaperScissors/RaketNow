import { Raket } from "./rakets.entity";
import { Users } from "../users/user.entity";
export declare class RaketApplication {
    applicationId: number;
    raketId: string;
    raket: Raket;
    raketistaId: string;
    raketista: Users;
    priceProposal: number;
    dateCreated: Date;
    CompletedAt: Date;
}
