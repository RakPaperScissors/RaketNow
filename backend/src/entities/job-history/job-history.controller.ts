import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { JobHistoryService } from './job-history.service';
import { CreateJobHistoryDto } from './dto/create-job-history.dto';
import { UpdateJobHistoryDto } from './dto/update-job-history.dto';

@Controller('job-history')
export class JobHistoryController {
  constructor(private readonly jobHistoryService: JobHistoryService) {}

  @Post()
  create(@Body() createJobHistoryDto: CreateJobHistoryDto) {
    return this.jobHistoryService.create(createJobHistoryDto);
  }

  @Get()
  findAll() {
    return this.jobHistoryService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.jobHistoryService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateJobHistoryDto: UpdateJobHistoryDto) {
    return this.jobHistoryService.update(+id, updateJobHistoryDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.jobHistoryService.remove(+id);
  }
}
