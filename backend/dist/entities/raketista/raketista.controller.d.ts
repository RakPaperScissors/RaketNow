import { RaketistaService } from './raketista.service';
import { CreateRaketistaDto } from './dto/create-raketista.dto';
import { UpdateRaketistaDto } from './dto/update-raketista.dto';
export declare class RaketistaController {
    private readonly raketistaService;
    constructor(raketistaService: RaketistaService);
    create(createRaketistaDto: CreateRaketistaDto): string;
    findAll(): string;
    findOne(id: string): string;
    update(id: string, updateRaketistaDto: UpdateRaketistaDto): string;
    remove(id: string): string;
}
