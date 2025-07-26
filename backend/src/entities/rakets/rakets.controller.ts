import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { RaketsService } from './rakets.service';
import { CreateRaketDto } from './dto/create-raket.dto';
import { UpdateRaketDto } from './dto/update-raket.dto';
import { CurrentUser } from 'src/auth/current-user.decorator';
import { Users } from '../user/entities/user.entity';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('rakets')
export class RaketsController {
  constructor(private readonly raketsService: RaketsService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() createRaketDto: CreateRaketDto, @CurrentUser() user: Users) {
    return this.raketsService.create(createRaketDto, user);
  }

  @Get()
  findAll() {
    return this.raketsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.raketsService.findOne(+id);
  }


  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateRaketDto: UpdateRaketDto, @CurrentUser() user: Users) {
    return this.raketsService.patch(+id, updateRaketDto, user.uid);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @CurrentUser() user: Users) {
    return this.raketsService.remove(+id, user.uid);
  }
}
