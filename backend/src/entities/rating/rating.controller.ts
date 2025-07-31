import { Controller, Post, Body, Param, Get, Patch, Delete, ParseIntPipe, UseGuards, Req } from '@nestjs/common';
import { JwtAuthGuard } from '../../auth/jwt-auth.guard';
import { RatingService } from './rating.service';
import { CreateRatingDto } from './dto/create-rating.dto';
import { UpdateRatingDto } from './dto/update-rating.dto';

@Controller('ratings')
export class RatingController {
  constructor(private readonly ratingService: RatingService) {}

  // POST /ratings/:userId/:raketId
  @Post(':raketId')
  @UseGuards(JwtAuthGuard)
  createRating(
    @Req() req,
    @Param('raketId', ParseIntPipe) raketId: number,
    @Body() dto: CreateRatingDto
  ) {
    const userId = req.user.id; // from cookie auth
    return this.ratingService.create(dto, userId, raketId);
  }

  @Get()
  findAll() {
    return this.ratingService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.ratingService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateRatingDto: UpdateRatingDto,
  ) {
    return this.ratingService.update(id, updateRatingDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.ratingService.remove(id);
  }
}
