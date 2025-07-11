import { Module } from '@nestjs/common';
import { SkillsService } from './skills.service';
import { SkillsController } from './skills.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Skills } from './entities/skill.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Skills])],
  controllers: [SkillsController],
  providers: [SkillsService],
})
export class SkillsModule {}
