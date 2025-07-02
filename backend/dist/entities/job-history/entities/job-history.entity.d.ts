import { Users } from './../../user/entities/user.entity';
import { Raket } from "./../../rakets/entities/raket.entity";
export declare enum jobHistoryType {
    RAKET = "Raket",
    WORK_EXPERIENCE = "Work Experience"
}
export declare class JobHistory {
    jobId: number;
    title: string;
    description: string;
    historyType: jobHistoryType;
    jobDate: Date;
    raketId: Raket;
    raketistaId: Users;
}
