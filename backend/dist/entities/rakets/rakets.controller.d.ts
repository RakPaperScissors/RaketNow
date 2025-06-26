import { RaketsService } from './rakets.service';
import { CreateRaketDto } from './dto/create-raket.dto';
import { UpdateRaketDto } from './dto/update-raket.dto';
export declare class RaketsController {
    private readonly raketsService;
    constructor(raketsService: RaketsService);
    create(createRaketDto: CreateRaketDto): string;
    findAll(): string;
    findOne(id: string): string;
    update(id: string, updateRaketDto: UpdateRaketDto): string;
    remove(id: string): string;
}
