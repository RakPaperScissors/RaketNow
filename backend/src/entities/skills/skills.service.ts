import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Skills } from './entities/skill.entity';
import { CreateSkillDto } from './dto/create-skill.dto';
import { UpdateSkillDto } from './dto/update-skill.dto';

@Injectable()
export class SkillsService {
  constructor(
    @InjectRepository(Skills)
    private readonly skillsRepository: Repository<Skills>,
  ) {}

  async create(createSkillDto: CreateSkillDto): Promise<Skills> {
    const newSkill = this.skillsRepository.create(createSkillDto);
    return this.skillsRepository.save(newSkill);
  }

  async findAll(): Promise<Skills[]> {
    return this.skillsRepository.find();
  }

  async findOne(id: number): Promise<Skills> {
    const skill = await this.skillsRepository.findOneBy({ skill_Id: id });
    if (!skill) {
      throw new NotFoundException(`Skill with ID ${id} not found.`);
    }
    return skill;
  }

  async update(id: number, updateSkillDto: UpdateSkillDto): Promise<Skills> {
    const skill = await this.skillsRepository.preload({
      skill_Id: id,
      ...updateSkillDto,
    });
    if (!skill) {
      throw new NotFoundException(`Skill with ID ${id} not found.`);
    }
    return this.skillsRepository.save(skill);
  }

  async remove(id: number): Promise<void> {
    const result = await this.skillsRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Skill with ID ${id} not found.`);
    }
  }
}
