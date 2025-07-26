import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { RaketistaSkillService } from './raketista-skill.service';
import { CreateRaketistaSkillDto } from './dto/create-raketista-skill.dto';
import { UpdateRaketistaSkillDto } from './dto/update-raketista-skill.dto';
import { CurrentUser } from 'src/auth/current-user.decorator';
import { Users } from '../user/entities/user.entity';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('raketista-skill')
export class RaketistaSkillController {
  constructor(private readonly raketistaSkillService: RaketistaSkillService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() createRaketistaSkillDto: CreateRaketistaSkillDto, @CurrentUser() user: Users) {
    return this.raketistaSkillService.create(createRaketistaSkillDto, user.uid);
  }

  @Get()
  findAll() {
    return this.raketistaSkillService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.raketistaSkillService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateRaketistaSkillDto: UpdateRaketistaSkillDto) {
    return this.raketistaSkillService.update(+id, updateRaketistaSkillDto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string, @CurrentUser() user: Users) {
    return this.raketistaSkillService.remove(+id, user.uid);
  }
}
