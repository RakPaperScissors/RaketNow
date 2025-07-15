import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateRaketistaSkillDto } from './dto/create-raketista-skill.dto';
import { UpdateRaketistaSkillDto } from './dto/update-raketista-skill.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { RaketistaSkill } from './entities/raketista-skill.entity';
import { Repository } from 'typeorm';
import { Raketista } from '../raketista/entities/raketista.entity';
import { Skills } from '../skills/entities/skill.entity';

@Injectable()
export class RaketistaSkillService {
  constructor(
    @InjectRepository(RaketistaSkill)
    private readonly rsRepo: Repository<RaketistaSkill>,
    @InjectRepository(Raketista)
    private readonly raketistaRepo: Repository<Raketista>,
    @InjectRepository(Skills)
    private readonly skillsRepo: Repository<Skills>,
  ) {}

  async create(createRaketistaSkillDto: CreateRaketistaSkillDto) {
    const raketista = await this.raketistaRepo.findOneBy({ uid: createRaketistaSkillDto.raketistaId});
    const skill = await this.skillsRepo.findOneBy({ skill_Id: createRaketistaSkillDto.skillId});

    if (!raketista || !skill ) {
      throw new NotFoundException('Raketista or Skill not found');
    }

    const existing = await this.rsRepo.findOne({
      where: {
        raketista: { uid: createRaketistaSkillDto.raketistaId },
        skill: { skill_Id: createRaketistaSkillDto.skillId },
      },
    });

    if (existing) {
      return { message: 'Skill already assigned to raketista' };
    }
    
    const raketistaSkill = this.rsRepo.create({ raketista, skill });
    return this.rsRepo.save(raketistaSkill);
  }

  findAll() {
    return this.rsRepo.find({
      relations: ['raketista', 'skill'],
    });
  }


  async findOne(id: number) {
    const found = await this.rsRepo.findOne({
      where: { id },
      relations: ['raketista', 'skill'],
    });

    if (!found) throw new NotFoundException(`RaketistaSkill with ID ${id} not found.`);
    return found;
  }

  async update(id: number, updateRaketistaSkillDto: UpdateRaketistaSkillDto) {
    const existing = await this.rsRepo.findOneBy({ id });
    if (!existing) throw new NotFoundException(`RaketistaSkill with ID ${id} not found.`);

    if(updateRaketistaSkillDto.raketistaId) {
      const raketista = await this.raketistaRepo.findOneBy({ uid: updateRaketistaSkillDto.raketistaId });
      if(!raketista) throw new NotFoundException(`Raketista not found.`);
      existing.raketista = raketista;
    }

    if(updateRaketistaSkillDto.skillId) {
      const skill = await this.skillsRepo.findOneBy({ skill_Id: updateRaketistaSkillDto.skillId });
      if (!skill) throw new NotFoundException('Skill not found.');
      existing.skill = skill;
    }

    return this.rsRepo.save(existing);
  }

  async remove(id: number) {
    const result = await this.rsRepo.delete(id);
    if(result.affected === 0) {
      throw new NotFoundException(`RaketistaSkill with id ${id} not found.`);
    }
    return { message: 'Deleted successfully.'};
  }
}
