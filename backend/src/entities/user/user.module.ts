import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from './entities/user.entity';
import { RaketistaSkillModule } from '../raketista-skill/raketista-skill.module';
import { SkillsModule } from '../skills/skills.module';
import { RaketistaSkill } from '../raketista-skill/entities/raketista-skill.entity';
import { RaketistaService } from '../raketista/raketista.service';
import { Organization } from '../organization/entities/organization.entity';
import { Raketista } from '../raketista/entities/raketista.entity';


@Module({
  imports: [TypeOrmModule.forFeature([Users, RaketistaSkill, Organization, Raketista]), SkillsModule, RaketistaSkillModule],
  controllers: [UserController],
  providers: [UserService, RaketistaService],
  exports: [UserService, TypeOrmModule.forFeature([Users, Raketista, Organization])],
})
export class UserModule {}
