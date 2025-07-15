import { RaketistaSkillService } from './raketista-skill.service';
import { CreateRaketistaSkillDto } from './dto/create-raketista-skill.dto';
import { UpdateRaketistaSkillDto } from './dto/update-raketista-skill.dto';
export declare class RaketistaSkillController {
    private readonly raketistaSkillService;
    constructor(raketistaSkillService: RaketistaSkillService);
    create(createRaketistaSkillDto: CreateRaketistaSkillDto): Promise<import("./entities/raketista-skill.entity").RaketistaSkill | {
        message: string;
    }>;
    findAll(): Promise<import("./entities/raketista-skill.entity").RaketistaSkill[]>;
    findOne(id: string): Promise<import("./entities/raketista-skill.entity").RaketistaSkill>;
    update(id: string, updateRaketistaSkillDto: UpdateRaketistaSkillDto): Promise<import("./entities/raketista-skill.entity").RaketistaSkill>;
    remove(id: string): Promise<{
        message: string;
    }>;
}
