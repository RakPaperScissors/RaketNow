import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { RaketistaService } from './raketista.service';
import { CreateRaketistaDto } from './dto/create-raketista.dto';
import { UpdateRaketistaDto } from './dto/update-raketista.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { UseGuards } from '@nestjs/common';
import { Roles } from 'src/common/decorators/roles.decorator';
import { RolesGuard } from 'src/common/guards/roles.guard';

// @UseGuards(JwtAuthGuard, RolesGuard)
@Controller('raketista')
export class RaketistaController {
  constructor(private readonly raketistaService: RaketistaService) {}

  // --- Basic CRUD operations for RAKETISTA user ---
  // POSTs a new raketista
  @Roles('admin')
  @Post()
  create(@Body() createRaketistaDto: CreateRaketistaDto) {
    return this.raketistaService.create(createRaketistaDto);
  }

  // GETs all raketista
  @Roles('admin', 'client', 'raketista', 'organization')
  @Get()
  findAll() {
    return this.raketistaService.findAll();
  }

  // GETs a specific raketista by uid
  @Roles('admin', 'client', 'raketista', 'organization')
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.raketistaService.findOne(+id);
  }

  // PATCHes a specific raketista by uid
  @Roles('admin', 'raketista')
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateRaketistaDto: UpdateRaketistaDto) {
    return this.raketistaService.update(+id, updateRaketistaDto);
  }

  // DELETEs a specific raketista by uid
  @Roles('admin', 'raketista')
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.raketistaService.remove(+id);
  }

  // --------------------------------------------------------------------------------------------------------

  // --- Search and Filter functions ---
  // GETs raketista by name
  @Roles('admin', 'client', 'raketista', 'organization')
  @Get('search/raketistaName/:name')
  searchByRaketistaName(@Param('name') name: string) {
    return this.raketistaService.searchByRaketistaName(name);
  }
}
