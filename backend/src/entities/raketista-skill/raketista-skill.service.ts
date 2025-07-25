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

  async create(createRaketistaSkillDto: CreateRaketistaSkillDto, userId: number) {
    const raketista = await this.raketistaRepo.findOneBy({ uid: userId });
    if (!raketista) {
      throw new NotFoundException('Raketista profile not found for the current user.');
    }
    const skill = await this.skillsRepo.findOneBy({ skill_Id: createRaketistaSkillDto.skillId});
    if (!skill) {
      throw new NotFoundException('Skill not found');
    }

    const existing = await this.rsRepo.findOne({
      where: {
        raketista: { uid: userId },
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

  async remove(id: number, userId: number) {
    // First, find the skill assignment and verify ownership in one step.
    const skillToRemove = await this.rsRepo.findOne({
        where: { 
            id: id, 
            raketista: { uid: userId } // Check if the owner is the user
        }
    });

    if (!skillToRemove) {
        // This error is thrown if the skill doesn't exist OR if the user doesn't own it.
        // We keep the message generic for security.
      throw new NotFoundException(`RaketistaSkill with id ${id} not found or you do not have permission to delete it.`);
    }

    await this.rsRepo.delete(id);
    
    return { message: 'Deleted successfully.'};
  }
}
