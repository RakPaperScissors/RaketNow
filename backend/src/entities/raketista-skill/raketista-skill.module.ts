import { Module } from '@nestjs/common';
import { RaketistaSkillService } from './raketista-skill.service';
import { RaketistaSkillController } from './raketista-skill.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RaketistaSkill } from './entities/raketista-skill.entity';
import { Raketista } from '../raketista/entities/raketista.entity';
import { Skills } from '../skills/entities/skill.entity';

@Module({
  imports: [TypeOrmModule.forFeature([RaketistaSkill, Raketista, Skills])],
  controllers: [RaketistaSkillController],
  providers: [RaketistaSkillService],
})
export class RaketistaSkillModule {}
