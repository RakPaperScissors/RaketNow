import { Controller, Get, Post, Body, Patch, Param, Delete , Req} from '@nestjs/common';
import { Request } from 'express';
import { NotificationService } from './notification.service';
import { CreateNotificationDto } from './dto/create-notification.dto';
import { UpdateNotificationDto } from './dto/update-notification.dto';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
@Controller('notification')
export class NotificationController {
  constructor(private readonly notificationService: NotificationService) {}

    @UseGuards(JwtAuthGuard)
    @Post()
    create(@Body() dto: CreateNotificationDto, @Req() req: Request) {
        if (!req.user || !('uid' in req.user)) {
          throw new Error('User not found in request');
        }
        const userId = (req.user as any).uid;
        return this.notificationService.create({ ...dto, user: { uid: userId } });
    }

    @Get()
    findAll() {
        return this.notificationService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.notificationService.findOne(+id);
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body() updateNotificationDto: UpdateNotificationDto) {
      return this.notificationService.update(+id, updateNotificationDto);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
      return this.notificationService.remove(+id);
    }
}
