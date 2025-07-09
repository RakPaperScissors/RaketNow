import { Injectable } from '@nestjs/common';
import { CreateRaketistaSkillDto } from './dto/create-raketista-skill.dto';
import { UpdateRaketistaSkillDto } from './dto/update-raketista-skill.dto';

@Injectable()
export class RaketistaSkillService {
  create(createRaketistaSkillDto: CreateRaketistaSkillDto) {
    return 'This action adds a new raketistaSkill';
  }

  findAll() {
    return `This action returns all raketistaSkill`;
  }

  findOne(id: number) {
    return `This action returns a #${id} raketistaSkill`;
  }

  update(id: number, updateRaketistaSkillDto: UpdateRaketistaSkillDto) {
    return `This action updates a #${id} raketistaSkill`;
  }

  remove(id: number) {
    return `This action removes a #${id} raketistaSkill`;
  }
}
