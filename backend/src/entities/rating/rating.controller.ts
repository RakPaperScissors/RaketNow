import { Controller, Post, Body, Param, Get, Patch, Delete, ParseIntPipe } from '@nestjs/common';
import { RatingService } from './rating.service';
import { CreateRatingDto } from './dto/create-rating.dto';
import { UpdateRatingDto } from './dto/update-rating.dto';

@Controller('ratings')
export class RatingController {
  constructor(private readonly ratingService: RatingService) {}

  // POST /ratings/:userId/:raketId
  @Post(':userId/:raketId')
  create(
    @Param('userId', ParseIntPipe) userId: number,
    @Param('raketId', ParseIntPipe) raketId: number,
    @Body() createRatingDto: CreateRatingDto,
  ) {
    return this.ratingService.create(createRatingDto, userId, raketId);
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
