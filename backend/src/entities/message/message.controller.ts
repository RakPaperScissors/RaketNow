import { Controller, Get, Post, Body, Param, UseGuards, Req, Query, ParseIntPipe, ParseUUIDPipe } from '@nestjs/common';
import { MessageService } from './message.service';
import { CreateMessageDto } from './dto/create-message.dto';
import { Request } from 'express';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { CurrentUser } from 'src/auth/current-user.decorator';
import { Users } from '../user/entities/user.entity';

@Controller('messages')
export class MessageController {
  constructor(private readonly messageService: MessageService) {}

 @UseGuards(JwtAuthGuard)
  @Post()
  create(
    @Body() createMessageDto: CreateMessageDto,
    @CurrentUser() user: Users,
  ) {
    return this.messageService.create(createMessageDto, String(user.uid));
  }

  @UseGuards(JwtAuthGuard)
  @Get('conversation/:conversationId')
  getMessagesForConversation(
    @Param('conversationId', ParseUUIDPipe) conversationId: string,
    @CurrentUser() user: Users,
    @Query('page', new ParseIntPipe({ optional: true })) page: number = 1,
    @Query('limit', new ParseIntPipe({ optional: true })) limit: number = 50,
  ) {
    return this.messageService.getMessagesForConversation(conversationId, String(user.uid), { page, limit });
  }
}