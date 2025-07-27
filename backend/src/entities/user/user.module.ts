import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from './entities/user.entity';
import { RaketistaSkillModule } from '../raketista-skill/raketista-skill.module';
import { SkillsModule } from '../skills/skills.module';
import { RaketistaSkill } from '../raketista-skill/entities/raketista-skill.entity';


@Module({
  imports: [TypeOrmModule.forFeature([Users, RaketistaSkill]), SkillsModule],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
