import { CreateRaketistaSkillDto } from './dto/create-raketista-skill.dto';
import { UpdateRaketistaSkillDto } from './dto/update-raketista-skill.dto';
import { RaketistaSkill } from './entities/raketista-skill.entity';
import { Repository } from 'typeorm';
import { Raketista } from '../raketista/entities/raketista.entity';
import { Skills } from '../skills/entities/skill.entity';
export declare class RaketistaSkillService {
    private readonly rsRepo;
    private readonly raketistaRepo;
    private readonly skillsRepo;
    constructor(rsRepo: Repository<RaketistaSkill>, raketistaRepo: Repository<Raketista>, skillsRepo: Repository<Skills>);
    create(createRaketistaSkillDto: CreateRaketistaSkillDto): Promise<RaketistaSkill | {
        message: string;
    }>;
    findAll(): Promise<RaketistaSkill[]>;
    findOne(id: number): Promise<RaketistaSkill>;
    update(id: number, updateRaketistaSkillDto: UpdateRaketistaSkillDto): Promise<RaketistaSkill>;
    remove(id: number): Promise<{
        message: string;
    }>;
}
