import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { JobHistoryService } from './job-history.service';
import { CreateJobHistoryDto } from './dto/create-job-history.dto';
import { UpdateJobHistoryDto } from './dto/update-job-history.dto';

@Controller('job-history')
export class JobHistoryController {
  constructor(private readonly jobHistoryService: JobHistoryService) {}

  // add history sa list, automatic if the raket is done, manual add if work experience
  @Post()
  create(@Body() createJobHistoryDto: CreateJobHistoryDto) {
    // service mag-handle ng logic if manual add or automatic
    return this.jobHistoryService.create(createJobHistoryDto);
  }

  // display all
  @Get()
  findAll() {
    return this.jobHistoryService.findAll();
  }

  // display specific
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.jobHistoryService.findOne(+id);
  }

  // update all info
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateJobHistoryDto: UpdateJobHistoryDto) {
    return this.jobHistoryService.update(+id, updateJobHistoryDto);
  }

  // update title
  @Patch(':id/title')
  updateTitle(@Param('id') id: string, @Body('value') value: string) {
    return this.jobHistoryService.updateField(+id, 'title', value);
  }

  // update description
  @Patch(':id/description')
  updateDescription(@Param('id') id: string, @Body('value') value: string) {
    return this.jobHistoryService.updateField(+id, 'description', value);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.jobHistoryService.remove(+id);
  }
}
