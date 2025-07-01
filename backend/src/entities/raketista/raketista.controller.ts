import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { RaketistaService } from './raketista.service';
import { CreateRaketistaDto } from './dto/create-raketista.dto';
import { UpdateRaketistaDto } from './dto/update-raketista.dto';

@Controller('raketista')
export class RaketistaController {
  constructor(private readonly raketistaService: RaketistaService) {}

  // --- Basic CRUD operations for RAKETISTA user ---
  // POSTs a new raketista
  @Post()
  create(@Body() createRaketistaDto: CreateRaketistaDto) {
    return this.raketistaService.create(createRaketistaDto);
  }

  // GETs all raketista
  @Get()
  findAll() {
    return this.raketistaService.findAll();
  }

  // GETs a specific raketista by uid
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.raketistaService.findOne(+id);
  }

  // PATCHes a specific raketista by uid
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateRaketistaDto: UpdateRaketistaDto) {
    return this.raketistaService.update(+id, updateRaketistaDto);
  }

  // DELETEs a specific raketista by uid
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.raketistaService.remove(+id);
  }

  // --- Search and Filter functions ---
  // GETs raketista by name
  @Get('search/raketistaName/:name')
  searchByRaketistaName(@Param('name') name: string) {
    return this.raketistaService.searchByRaketistaName(name);
  }
}
