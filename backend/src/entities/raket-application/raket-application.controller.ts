import { Controller, Get, Post, Body, Patch, Param, Delete, Req, UseGuards } from '@nestjs/common';
import { RaketApplicationService } from './raket-application.service';
import { CreateRaketApplicationDto } from './dto/create-raket-application.dto';
import { UpdateRaketApplicationDto } from './dto/update-raket-application.dto';
import { Request } from 'express';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('raket-application')
export class RaketApplicationController {
  constructor(private readonly raketApplicationService: RaketApplicationService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() dto: CreateRaketApplicationDto, @Req() req: Request) {
    const user = req.user;
    return this.raketApplicationService.create(dto, user);
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

  // for accepting or rejecting applications (from client side)
  @Patch(':id/accept')
  accept(@Param('id') id: number) {
    return this.raketApplicationService.accept(id);
  }

  @Patch(':id/reject')
  reject(@Param('id') id: number) {
    return this.raketApplicationService.reject(id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.raketApplicationService.remove(+id);
  }
}
