import { Users } from './../../user/entities/user.entity';
import { Raket } from "./../../rakets/entities/raket.entity";
export declare class JobHistory {
    jobId: number;
    title: string;
    description: string;
    historyType: 'Raket' | 'Work_Experience';
    jobDate: Date;
    raket: Raket;
    raketistaId: Users;
}
