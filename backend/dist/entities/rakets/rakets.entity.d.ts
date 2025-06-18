import { Users } from '../users/user.entity';
export declare class Raket {
    racketId: number;
    user: Users;
    title: string;
    description: string;
    status: string;
    budget: number;
    dateCreated: Date;
    completedAt: Date;
}
