import { CreateRaketDto } from './dto/create-raket.dto';
import { UpdateRaketDto } from './dto/update-raket.dto';
import { Raket } from './entities/raket.entity';
import { Repository } from 'typeorm';
import { Users } from '../user/entities/user.entity';
export declare class RaketsService {
    private readonly raket;
    private readonly users;
    constructor(raket: Repository<Raket>, users: Repository<Users>);
    create(createRaketDto: CreateRaketDto): Promise<Raket>;
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
            name: string;
            lastActive: Date;
        };
        pictures: {
            id: number;
            imageUrl: string;
            displayOrder: number;
        }[];
    }[]>;
    findOne(raketId: number): Promise<{
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
            name: string;
            lastActive: Date;
        };
        pictures: {
            id: number;
            imageUrl: string;
            displayOrder: number;
        }[];
    }>;
    patch(racketId: number, updateRaketDto: UpdateRaketDto): Promise<{
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
            name: string;
            lastActive: Date;
        };
        pictures: {
            id: number;
            imageUrl: string;
            displayOrder: number;
        }[];
    } & Raket>;
    remove(racketId: number): Promise<import("typeorm").DeleteResult>;
}
