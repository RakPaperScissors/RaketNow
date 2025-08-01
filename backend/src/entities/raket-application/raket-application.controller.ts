import { Controller, Get, Post, Body, Patch, Param, Delete, Req, UseGuards, UnauthorizedException, ParseIntPipe  } from '@nestjs/common';
import { RaketApplicationService } from './raket-application.service';
import { CreateRaketApplicationDto } from './dto/create-raket-application.dto';
import { UpdateRaketApplicationDto } from './dto/update-raket-application.dto';
import { Request } from 'express';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { Users } from 'src/entities/user/entities/user.entity';

interface AuthenticatedRequest extends Request {
  user: Users;
}

@Controller('raket-application')
export class RaketApplicationController {
  constructor(private readonly raketApplicationService: RaketApplicationService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() dto: CreateRaketApplicationDto, @Req() req: AuthenticatedRequest) {
    return this.raketApplicationService.create(dto, req.user);
  }

  // for raket applications
  @UseGuards(JwtAuthGuard)
  @Get()
  getClientApplications(@Req() req: AuthenticatedRequest) {
    return this.raketApplicationService.getAllForClient(req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Get('my-applications')
  getMyApplications(@Req() req: AuthenticatedRequest) {
    return this.raketApplicationService.getApplicationsByRaketista(req.user);
  }

  @Get('raket/:raketId/applications')
  @UseGuards(JwtAuthGuard)
  getApplicationsByRaket(
    @Param('raketId', ParseIntPipe) raketId: number,
    @Req() req: Request,
  ) {
    const user = req.user as { uid: number; role: string; email: string };
    console.log('GET /raket-application/raket/:raketId/applications called with raketId:', raketId);
    return this.raketApplicationService.findApplicationsByRaketId(raketId);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.raketApplicationService.findOne(+id);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateRaketApplicationDto: UpdateRaketApplicationDto,
  ) {
    return this.raketApplicationService.update(+id, updateRaketApplicationDto);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id/accept')
  accept(@Param('id') id: string, @Req() req: AuthenticatedRequest) {
    if (!req.user) throw new UnauthorizedException();
    return this.raketApplicationService.accept(+id, req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id/reject')
  reject(@Param('id') id: string, @Req() req: AuthenticatedRequest) {
    if (!req.user) throw new UnauthorizedException();
    return this.raketApplicationService.reject(+id, req.user);
  }

  @Patch(':id/withdraw')
  @UseGuards(JwtAuthGuard)
  async withdraw(
    @Param('id') id: number,
    @Req() req: any
  ) {
    const user = req.user;
    return this.raketApplicationService.withdraw(id, user);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.raketApplicationService.remove(+id);
  }
}