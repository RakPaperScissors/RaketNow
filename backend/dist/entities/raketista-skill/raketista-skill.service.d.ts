import { CreateRaketistaSkillDto } from './dto/create-raketista-skill.dto';
import { UpdateRaketistaSkillDto } from './dto/update-raketista-skill.dto';
export declare class RaketistaSkillService {
    create(createRaketistaSkillDto: CreateRaketistaSkillDto): string;
    findAll(): string;
    findOne(id: number): string;
    update(id: number, updateRaketistaSkillDto: UpdateRaketistaSkillDto): string;
    remove(id: number): string;
}
