import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { RaketistaSkillService } from './raketista-skill.service';
import { CreateRaketistaSkillDto } from './dto/create-raketista-skill.dto';
import { UpdateRaketistaSkillDto } from './dto/update-raketista-skill.dto';

@Controller('raketista-skill')
export class RaketistaSkillController {
  constructor(private readonly raketistaSkillService: RaketistaSkillService) {}

  @Post()
  create(@Body() createRaketistaSkillDto: CreateRaketistaSkillDto) {
    return this.raketistaSkillService.create(createRaketistaSkillDto);
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

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.raketistaSkillService.remove(+id);
  }
}
