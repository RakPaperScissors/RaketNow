import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { RaketistaService } from './raketista.service';
import { CreateRaketistaDto } from './dto/create-raketista.dto';
import { UpdateRaketistaDto } from './dto/update-raketista.dto';

@Controller('raketista')
export class RaketistaController {
  constructor(private readonly raketistaService: RaketistaService) {}

  // CRUD operations for RAKETISTA user
  @Post()
  create(@Body() createRaketistaDto: CreateRaketistaDto) {
    return this.raketistaService.create(createRaketistaDto);
  }

  @Get()
  findAll() {
    return this.raketistaService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.raketistaService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateRaketistaDto: UpdateRaketistaDto) {
    return this.raketistaService.update(+id, updateRaketistaDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.raketistaService.remove(+id);
  }

  @Get('search/raketistaName/:name')
  searchByRaketistaName(@Param('name') name: string) {
    return this.raketistaService.searchByRaketistaName(name);
  }
}
