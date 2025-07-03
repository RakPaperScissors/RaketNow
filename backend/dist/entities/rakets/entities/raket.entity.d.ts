import { RaketPictures } from 'src/entities/raket-pictures/entities/raket-picture.entity';
import { Users } from 'src/entities/user/entities/user.entity';
export declare enum RaketStatus {
    OPEN = "open",
    IN_PROGRESS = "in_progress",
    COMPLETED = "completed",
    CANCELLED = "cancelled"
}
export declare class Raket {
    raketId: number;
    user: Users;
    title: string;
    description: string;
    status: RaketStatus;
    budget: number;
    pictures: RaketPictures[];
    dateCreated: Date;
    completedAt: Date;
}
