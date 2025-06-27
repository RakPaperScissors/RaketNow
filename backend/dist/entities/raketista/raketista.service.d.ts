import { CreateRaketistaDto } from './dto/create-raketista.dto';
import { UpdateRaketistaDto } from './dto/update-raketista.dto';
import { Repository } from 'typeorm';
import { Raketista } from './entities/raketista.entity';
export declare class RaketistaService {
    private readonly raketistas;
    constructor(raketistas: Repository<Raketista>);
    create(createRaketistaDto: CreateRaketistaDto): Promise<Raketista>;
    findAll(): Promise<Raketista[]>;
    findOne(uid: number): Promise<Raketista | null>;
    update(uid: number, updateRaketistaDto: UpdateRaketistaDto): Promise<Raketista>;
    remove(uid: number): Promise<import("typeorm").DeleteResult>;
}
