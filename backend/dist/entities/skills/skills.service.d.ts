import { Repository } from 'typeorm';
import { Skills } from './entities/skill.entity';
import { CreateSkillDto } from './dto/create-skill.dto';
import { UpdateSkillDto } from './dto/update-skill.dto';
export declare class SkillsService {
    private readonly skillsRepository;
    constructor(skillsRepository: Repository<Skills>);
    create(createSkillDto: CreateSkillDto): Promise<Skills>;
    findAll(): Promise<Skills[]>;
    findOne(id: number): Promise<Skills>;
    update(id: number, updateSkillDto: UpdateSkillDto): Promise<Skills>;
    remove(id: number): Promise<void>;
}
