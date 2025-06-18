import { Users } from '../users/user.entity';
export declare enum RaketStatus {
    OPEN = "open",
    IN_PROGRESS = "in_progress",
    COMPLETED = "completed",
    CANCELLED = "cancelled"
}
export declare class Raket {
    racketId: number;
    user: Users;
    title: string;
    description: string;
    status: RaketStatus;
    budget: number;
    dateCreated: Date;
    completedAt: Date;
}
