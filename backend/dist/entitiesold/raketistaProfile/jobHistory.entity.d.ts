import { Users } from "../users/user.entity";
import { Raket } from "../rakets/rakets.entity";
export declare enum jobHistoryType {
}
export declare class JobHistory {
    jobId: number;
    title: string;
    description: string;
    historyType: jobHistoryType;
    jobDate: Date;
    racketId: Raket;
    raketistaId: Users;
}
