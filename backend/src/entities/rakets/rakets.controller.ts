import { Controller, Get, Post, Body, Patch, Param, Delete, Req, UseGuards } from '@nestjs/common';
import { RaketStatus } from "./entities/raket.entity";
import { RaketsService } from './rakets.service';
import { CreateRaketDto } from './dto/create-raket.dto';
import { UpdateRaketDto } from './dto/update-raket.dto';
import { CurrentUser } from 'src/auth/current-user.decorator';
import { Request } from 'express';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { ParseIntPipe } from '@nestjs/common';
import { Users, userRole } from 'src/entities/user/entities/user.entity';

export interface RequestWithUser extends Request {
  user: {
    uid: number;
    role: userRole;
    email?: string;
    firstName?: string;
    lastName?: string;
  };
}

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

  @UseGuards(JwtAuthGuard)
  @Get('myrakets')
  getMyRakets(@Req() req: RequestWithUser) {
    return this.raketsService.findMyRakets(req.user.uid);
  }

  @UseGuards(JwtAuthGuard)
  @Get('assigned-to-me')
  getAssignedRakets(@Req() req: RequestWithUser) {
    return this.raketsService.getRaketsAssignedToUser(req.user.uid);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id/status')
  async updateStatus(
    @Param('id', ParseIntPipe) raketId: number,
    @Body('status') status: RaketStatus
  ) {
    return this.raketsService.updateRaketStatus(raketId, status);
  }

  @Patch(':id/request-completion')
  @UseGuards(JwtAuthGuard)
  async requestCompletion(
    @Param('id', ParseIntPipe) raketId: number,
    @Req() req: Request
  ) {
    const userId = req.user?.['uid'];
    return this.raketsService.raketistaRequestCompletion(raketId, userId);
  }

  @Patch(':id/cancel-completion-request')
  @UseGuards(JwtAuthGuard)
  async cancelCompletionRequest(
    @Param('id', ParseIntPipe) raketId: number,
    @Req() req: Request
  ) {
    const userId = req.user?.['uid'];
    return this.raketsService.cancelCompletionRequest(raketId, userId);
  }

  @Patch(':raketId/reject-completion-request')
  @UseGuards(JwtAuthGuard)
  async clientRejectCompletion(
    @Param('raketId', ParseIntPipe) raketId: number,
    @Req() req: any,
  ) {
    const clientId = req.user.uid;
    return this.raketsService.clientRejectsCompletionRequest(raketId, clientId);
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.raketsService.findOne(id);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateRaketDto: UpdateRaketDto, @CurrentUser() user: Users) {
    return this.raketsService.patch(+id, updateRaketDto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  remove(@Param('id') id: string, @Req() req: Request) {
    const userId = (req.user as any)?.uid;
    return this.raketsService.remove(+id, userId);
  }

  @Patch(':id/cancel')
  @UseGuards(JwtAuthGuard)
  async cancelRaket(
    @Param('id', ParseIntPipe) raketId: number,
    @Req() req: any,
  ) {
    const userId = req.user.uid;
    return this.raketsService.cancelRaket(raketId, userId);
  }
}
