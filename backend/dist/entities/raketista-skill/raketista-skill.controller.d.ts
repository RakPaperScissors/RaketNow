import { RaketistaSkillService } from './raketista-skill.service';
import { CreateRaketistaSkillDto } from './dto/create-raketista-skill.dto';
import { UpdateRaketistaSkillDto } from './dto/update-raketista-skill.dto';
export declare class RaketistaSkillController {
    private readonly raketistaSkillService;
    constructor(raketistaSkillService: RaketistaSkillService);
    create(createRaketistaSkillDto: CreateRaketistaSkillDto): string;
    findAll(): string;
    findOne(id: string): string;
    update(id: string, updateRaketistaSkillDto: UpdateRaketistaSkillDto): string;
    remove(id: string): string;
}
