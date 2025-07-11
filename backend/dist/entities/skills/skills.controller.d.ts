import { SkillsService } from './skills.service';
import { CreateSkillDto } from './dto/create-skill.dto';
import { UpdateSkillDto } from './dto/update-skill.dto';
export declare class SkillsController {
    private readonly skillsService;
    constructor(skillsService: SkillsService);
    create(createSkillDto: CreateSkillDto): Promise<import("./entities/skill.entity").Skills>;
    findAll(): Promise<import("./entities/skill.entity").Skills[]>;
    findOne(id: string): Promise<import("./entities/skill.entity").Skills>;
    update(id: string, updateSkillDto: UpdateSkillDto): Promise<import("./entities/skill.entity").Skills>;
    remove(id: string): Promise<void>;
}
