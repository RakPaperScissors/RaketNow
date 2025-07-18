import { Controller, Get, Post, Body, UseGuards, Req } from '@nestjs/common';
import { ConversationService } from './conversation.service';
import { CreateConversationDto } from './dto/create-conversation.dto';
import { Request } from 'express';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { CurrentUser } from 'src/auth/current-user.decorator';
import { Users } from '../user/entities/user.entity';

@Controller('conversations')
export class ConversationController {
  constructor(private readonly conversationService: ConversationService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() createConversationDto: CreateConversationDto) {
    return this.conversationService.create(createConversationDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  getConversationsForUser(@CurrentUser() user: Users) {
    return this.conversationService.getConversationsForUser(String(user.uid));
  }
}