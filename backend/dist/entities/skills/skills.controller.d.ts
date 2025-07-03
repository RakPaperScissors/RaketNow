import { SkillsService } from './skills.service';
import { CreateSkillDto } from './dto/create-skill.dto';
import { UpdateSkillDto } from './dto/update-skill.dto';
export declare class SkillsController {
    private readonly skillsService;
    constructor(skillsService: SkillsService);
    create(createSkillDto: CreateSkillDto): string;
    findAll(): string;
    findOne(id: string): string;
    update(id: string, updateSkillDto: UpdateSkillDto): string;
    remove(id: string): string;
}
