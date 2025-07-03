import { CreateSkillDto } from './dto/create-skill.dto';
import { UpdateSkillDto } from './dto/update-skill.dto';
export declare class SkillsService {
    create(createSkillDto: CreateSkillDto): string;
    findAll(): string;
    findOne(id: number): string;
    update(id: number, updateSkillDto: UpdateSkillDto): string;
    remove(id: number): string;
}
