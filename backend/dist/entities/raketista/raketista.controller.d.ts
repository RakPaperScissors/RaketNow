import { RaketistaService } from './raketista.service';
import { CreateRaketistaDto } from './dto/create-raketista.dto';
import { UpdateRaketistaDto } from './dto/update-raketista.dto';
export declare class RaketistaController {
    private readonly raketistaService;
    constructor(raketistaService: RaketistaService);
    create(createRaketistaDto: CreateRaketistaDto): Promise<import("./entities/raketista.entity").Raketista>;
    findAll(): Promise<import("./entities/raketista.entity").Raketista[]>;
    findOne(id: string): Promise<import("./entities/raketista.entity").Raketista | null>;
    update(id: string, updateRaketistaDto: UpdateRaketistaDto): Promise<import("./entities/raketista.entity").Raketista>;
    remove(id: string): Promise<import("typeorm").DeleteResult>;
    searchByRaketistaName(name: string): Promise<import("./entities/raketista.entity").Raketista[]>;
}
