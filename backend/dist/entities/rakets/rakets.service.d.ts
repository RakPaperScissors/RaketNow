import { CreateRaketDto } from './dto/create-raket.dto';
import { UpdateRaketDto } from './dto/update-raket.dto';
export declare class RaketsService {
    create(createRaketDto: CreateRaketDto): string;
    findAll(): string;
    findOne(id: number): string;
    update(id: number, updateRaketDto: UpdateRaketDto): string;
    remove(id: number): string;
}
