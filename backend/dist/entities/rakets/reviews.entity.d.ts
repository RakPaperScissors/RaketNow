import { Users } from '../users/user.entity';
import { Raket } from '../rakets/rakets.entity';
export declare class Review {
    uid: number;
    clientId: number;
    client: Users;
    raketistaId: number;
    raketista: Users;
    raketId: number;
    raket: Raket;
    rating: number;
    comment: string;
    createdAt: Date;
}
