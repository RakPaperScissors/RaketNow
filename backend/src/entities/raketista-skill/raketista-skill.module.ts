import { Module } from '@nestjs/common';
import { RaketistaSkillService } from './raketista-skill.service';
import { RaketistaSkillController } from './raketista-skill.controller';

@Module({
  controllers: [RaketistaSkillController],
  providers: [RaketistaSkillService],
})
export class RaketistaSkillModule {}
