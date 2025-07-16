import { RaketsService } from './rakets.service';
import { CreateRaketDto } from './dto/create-raket.dto';
import { UpdateRaketDto } from './dto/update-raket.dto';
export declare class RaketsController {
    private readonly raketsService;
    constructor(raketsService: RaketsService);
    create(createRaketDto: CreateRaketDto): Promise<import("./entities/raket.entity").Raket>;
    findAll(): Promise<{
        raketId: number;
        title: string;
        description: string;
        status: import("./entities/raket.entity").RaketStatus;
        budget: number;
        dateCreated: Date;
        completedAt: Date;
        user: {
            uid: number;
            email: string;
            firtName: string;
            lastName: string;
            lastActive: Date;
        };
        pictures: {
            id: number;
            imageUrl: string;
            displayOrder: number;
        }[];
    }[]>;
    findOne(id: string): Promise<{
        raketId: number;
        title: string;
        description: string;
        status: import("./entities/raket.entity").RaketStatus;
        budget: number;
        dateCreated: Date;
        completedAt: Date;
        user: {
            uid: number;
            email: string;
            firstName: string;
            lastName: string;
            lastActive: Date;
        };
        pictures: {
            id: number;
            imageUrl: string;
            displayOrder: number;
        }[];
    }>;
    update(id: string, updateRaketDto: UpdateRaketDto): Promise<{
        raketId: number;
        title: string;
        description: string;
        status: import("./entities/raket.entity").RaketStatus;
        budget: number;
        dateCreated: Date;
        completedAt: Date;
        user: {
            uid: number;
            email: string;
            firstName: string;
            lastName: string;
            lastActive: Date;
        };
        pictures: {
            id: number;
            imageUrl: string;
            displayOrder: number;
        }[];
    } & import("./entities/raket.entity").Raket>;
    remove(id: string): Promise<import("typeorm").DeleteResult>;
}
