import { CreateRaketistaDto } from './dto/create-raketista.dto';
import { UpdateRaketistaDto } from './dto/update-raketista.dto';
export declare class RaketistaService {
    create(createRaketistaDto: CreateRaketistaDto): string;
    findAll(): string;
    findOne(id: number): string;
    update(id: number, updateRaketistaDto: UpdateRaketistaDto): string;
    remove(id: number): string;
}
