import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { RaketsService } from './rakets.service';
import { CreateRaketDto } from './dto/create-raket.dto';
import { UpdateRaketDto } from './dto/update-raket.dto';

@Controller('rakets')
export class RaketsController {
  constructor(private readonly raketsService: RaketsService) {}

  @Post()
  create(@Body() createRaketDto: CreateRaketDto) {
    return this.raketsService.create(createRaketDto);
  }

  @Get()
  findAll() {
    return this.raketsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.raketsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateRaketDto: UpdateRaketDto) {
    return this.raketsService.update(+id, updateRaketDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.raketsService.remove(+id);
  }
}
