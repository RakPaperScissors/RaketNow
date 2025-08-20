import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe } from '@nestjs/common';
import { VisitsService } from './visits.service';
import { CreateVisitDto } from './dto/create-visit.dto';
import { UpdateVisitDto } from './dto/update-visit.dto';

@Controller('visits')
export class VisitsController {
  constructor(private readonly visitsService: VisitsService) {}

  @Post()
  create(@Body() createVisitDto: CreateVisitDto) {
    return this.visitsService.create(createVisitDto);
  }

  @Get()
  findAll() {
    return this.visitsService.findAll();
  }

  @Post("track")
  async trackVisit(@Body("sessionId") sessionId: string, @Body("userId") userId?: number) {
    await this.visitsService.trackVisit(sessionId, userId);
    return { success: true };
  }

  @Get("stats")
  async getStats() {
    return this.visitsService.getStats();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: string) {
    return this.visitsService.findOne(+id);
  }
  
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateVisitDto: UpdateVisitDto) {
    return this.visitsService.update(+id, updateVisitDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.visitsService.remove(+id);
  }

  
}
