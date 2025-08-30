import { Controller, Get, Post, Body, Patch, Param, Delete, Request, UseGuards, ParseIntPipe, Query, Req, NotFoundException, UploadedFiles, UseInterceptors } from '@nestjs/common';
import { CreateRaketDto } from './dto/create-raket.dto';
import { UpdateRaketDto } from './dto/update-raket.dto';
import { RaketStatus } from './entities/raket.entity';
import { RaketsService } from './rakets.service';
import { Users } from '../user/entities/user.entity';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { CurrentUser } from 'src/auth/current-user.decorator';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { FilesInterceptor } from '@nestjs/platform-express';
import { MyRaketDto } from './rakets.service';

export interface RequestWithUser extends Request {
  user: Users;
}
@Controller('rakets')
export class RaketsController {
  constructor(
    private readonly raketsService: RaketsService,
    @InjectRepository(Users)
    private readonly usersRepository: Repository<Users>,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  @UseInterceptors(FilesInterceptor('images'))
  async create(
    @Body() dto: CreateRaketDto,
    @UploadedFiles() files: Express.Multer.File[], 
    @Req() req: RequestWithUser
  ) {
    const user = await this.usersRepository.findOne({ where: { uid: req.user.uid } });
    if (!user) {
      throw new NotFoundException('User not found');
    }

    return this.raketsService.create(dto, user, files);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id/cancel-open')
  cancelOpenRaket(
    @Param('id', ParseIntPipe) raketId: number,
    @Req() req: RequestWithUser
  ) {
    return this.raketsService.cancelOpenRaket(raketId, req.user.uid);
  }

  // @UseGuards(JwtAuthGuard)
  // @Get('/myrakets')
  // findMyRakets(@Req() req: RequestWithUser) {
  //   return this.raketsService.findMyRakets(req.user.uid);
  // }
  @UseGuards(JwtAuthGuard)
  @Get('/myrakets')
  findMyRakets(@Req() req: RequestWithUser): Promise<MyRaketDto[]> {
    return this.raketsService.findMyRakets(req.user.uid);
  }

  @Get('open')
  async getOpenRakets() {
    return this.raketsService.findOpenRakets();
  }

  @UseGuards(JwtAuthGuard)
  @Get('/assigned-to-me')
  getRaketsAssignedToUser(@Req() req: RequestWithUser) {
    return this.raketsService.getRaketsAssignedToUser(req.user.uid);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id/status')
  updateRaketStatus(
    @Param('id', ParseIntPipe) id: number,
    @Query('status') status: RaketStatus,
    @Req() req: RequestWithUser,
  ) {
    return this.raketsService.updateRaketStatus(id, status, req.user.uid);
  }

  @Patch(':id/reject-completion')
  @UseGuards(JwtAuthGuard)
  async clientRejectCompletion(
    @Param('id', ParseIntPipe) raketId: number,
    @Req() req: any,
  ) {
    const clientId = req.user.uid;
    return this.raketsService.clientRejectsCompletionRequest(raketId, clientId);
  }

  @Patch(':id/withdraw')
  @UseGuards(JwtAuthGuard)
  async withdrawFromRaket(
    @Param('id') raketId: number,
    @Req() req: any,
  ) {
    const raketistaUid = req.user.uid;
    return this.raketsService.withdrawRaket(raketId, raketistaUid);
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
  remove(@Param('id', ParseIntPipe) raketId: number, @Req() req: RequestWithUser) {
    return this.raketsService.deleteRaket(raketId, req.user.uid);
  }

  // @UseGuards(JwtAuthGuard)
  // @Patch(':id/cancel')
  // cancelRaket(@Param('id', ParseIntPipe) raketId: number, @Req() req: RequestWithUser) {
  //   return this.raketsService.cancelRaket(raketId, req.user.uid);
  // }

  // @UseGuards(JwtAuthGuard)
  // @Patch(':id/reject-completion')
  // clientRejectsCompletionRequest(@Param('id', ParseIntPipe) raketId: number, @Req() req: RequestWithUser) {
  //   return this.raketsService.clientRejectsCompletionRequest(raketId, req.user.uid);
  // }

  @UseGuards(JwtAuthGuard)
  @Patch(':id/cancel-ongoing')
  cancelOngoingRaket(
    @Param('id', ParseIntPipe) raketId: number,
    @Req() req: any
  ) {
    return this.raketsService.cancelOngoingRaket(raketId, req.user.uid);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id/withdraw')
  withdrawRaket(@Param('id', ParseIntPipe) raketId: number, @Req() req: RequestWithUser) {
    return this.raketsService.withdrawRaket(raketId, req.user.uid);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id/request-completion')
  raketistaRequestCompletion(@Param('id', ParseIntPipe) raketId: number, @Req() req: RequestWithUser) {
    return this.raketsService.raketistaRequestCompletion(raketId, req.user.uid);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id/cancel-completion')
  cancelCompletionRequest(@Param('id', ParseIntPipe) raketId: number, @Req() req: RequestWithUser) {
    return this.raketsService.cancelCompletionRequest(raketId, req.user.uid);
  }

  @Get()
  findAll() {
    return this.raketsService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Get('/rakets-by-user/:userId')
  async getRaketsOfUser(@Param('userId') userId: number, @Req() req: RequestWithUser) {
    return this.raketsService.getRaketsOfUser(userId);
  }

  @UseGuards(JwtAuthGuard)
  @Get('completed')
  async getCompletedRakets(@Req() req) {
    const userId = req.user.uid;
    return this.raketsService.findCompletedRakets(userId);
  }

  @UseGuards(JwtAuthGuard)
  @Get('completed/assigned')
  async getCompletedAssignedRakets(@Req() req) {
    const raketistaId = req.user.uid; 
    return this.raketsService.findCompletedRaketsAsRaketista(raketistaId);
  }

  @UseGuards(JwtAuthGuard)
  @Get('completed/:userId')
  async getCompletedRaketsByUser(@Param('userId') userId: string) {
    return this.raketsService.findCompletedRaketsAsRaketista(Number(userId));
  }
}
