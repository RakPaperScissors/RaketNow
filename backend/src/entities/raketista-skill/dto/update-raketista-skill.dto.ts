import { PartialType } from '@nestjs/mapped-types';
import { CreateRaketistaSkillDto } from './create-raketista-skill.dto';

export class UpdateRaketistaSkillDto extends PartialType(CreateRaketistaSkillDto) {}
