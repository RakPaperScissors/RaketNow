import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from './entities/user.entity';
import { RaketistaSkillModule } from '../raketista-skill/raketista-skill.module';
import { SkillsModule } from '../skills/skills.module';
import { RaketistaSkill } from '../raketista-skill/entities/raketista-skill.entity';
import { RaketistaService } from '../raketista/raketista.service';


@Module({
  imports: [TypeOrmModule.forFeature([Users, RaketistaSkill]), SkillsModule, RaketistaSkillModule],
  controllers: [UserController],
  providers: [UserService, RaketistaService],
  exports: [UserService],
})
export class UserModule {}
