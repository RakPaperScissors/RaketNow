import { Controller, Get, Post, Body, Patch, Param, Delete, Request, UseGuards, ParseIntPipe, Query, } from '@nestjs/common';
import { CreateRaketDto } from './dto/create-raket.dto';
import { UpdateRaketDto } from './dto/update-raket.dto';
import { RaketStatus } from './entities/raket.entity';
import { RaketsService } from './rakets.service';
import { Users } from '../user/entities/user.entity';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { CurrentUser } from 'src/auth/current-user.decorator';

@Controller('rakets')
export class RaketsController {
  constructor(private readonly raketsService: RaketsService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() dto: CreateRaketDto, @Request() req) {
    return this.raketsService.create(dto, req.user);
  }

  @Get()
  findAll() {
    return this.raketsService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Get('/myrakets')
  findMyRakets(@Request() req) {
    return this.raketsService.findMyRakets(req.user.uid);
  }

  @UseGuards(JwtAuthGuard)
  @Get('/assigned-to-me')
  getRaketsAssignedToUser(@Request() req) {
    return this.raketsService.findMyRakets(Number(req.user.uid));
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id/status')
  updateRaketStatus(
    @Param('id') id: number,
    @Query('status') status: RaketStatus,
    @Request() req
  ) {
    return this.raketsService.updateRaketStatus(id, status, req.user.uid);
  }


  @Get(':id')
  findOne(@Param('id', ParseIntPipe) raketId: number) {
    return this.raketsService.findOne(raketId);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  patch(@Param('id', ParseIntPipe) raketId: number, @Body() dto: UpdateRaketDto) {
    return this.raketsService.patch(raketId, dto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Param('id', ParseIntPipe) raketId: number, @Request() req) {
    return this.raketsService.remove(raketId, req.user.uid);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id/cancel')
  cancelRaket(@Param('id', ParseIntPipe) raketId: number, @Request() req) {
    return this.raketsService.cancelRaket(raketId, req.user.uid);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id/reject-completion')
  clientRejectsCompletionRequest(@Param('id', ParseIntPipe) raketId: number, @Request() req) {
    return this.raketsService.clientRejectsCompletionRequest(raketId, req.user.uid);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id/withdraw')
  withdrawRaket(@Param('id', ParseIntPipe) raketId: number, @Request() req) {
    return this.raketsService.withdrawRaket(raketId, req.user.uid);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id/request-completion')
  raketistaRequestCompletion(@Param('id', ParseIntPipe) raketId: number, @Request() req) {
    return this.raketsService.raketistaRequestCompletion(raketId, req.user.uid);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id/cancel-completion-request')
  cancelCompletionRequest(@Param('id', ParseIntPipe) raketId: number, @Request() req) {
    return this.raketsService.cancelCompletionRequest(raketId, req.user.uid);
  }
}