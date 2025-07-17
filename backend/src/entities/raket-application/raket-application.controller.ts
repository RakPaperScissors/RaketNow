import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { RaketApplicationService } from './raket-application.service';
import { CreateRaketApplicationDto } from './dto/create-raket-application.dto';
import { UpdateRaketApplicationDto } from './dto/update-raket-application.dto';

@Controller('raket-application')
export class RaketApplicationController {
  constructor(private readonly raketApplicationService: RaketApplicationService) {}

  @Post()
  create(@Body() createRaketApplicationDto: CreateRaketApplicationDto) {
    return this.raketApplicationService.create(createRaketApplicationDto);
  }

  @Get()
  findAll() {
    return this.raketApplicationService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.raketApplicationService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateRaketApplicationDto: UpdateRaketApplicationDto) {
    return this.raketApplicationService.update(+id, updateRaketApplicationDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.raketApplicationService.remove(+id);
  }
}
