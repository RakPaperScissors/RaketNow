import { Module } from '@nestjs/common';
import { RaketPicturesService } from './raket-pictures.service';
import { RaketPicturesController } from './raket-pictures.controller';
import { RaketPictures } from './entities/raket-picture.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Raket } from '../rakets/entities/raket.entity';

@Module({
  imports: [TypeOrmModule.forFeature([RaketPictures, Raket])],
  controllers: [RaketPicturesController],
  providers: [RaketPicturesService],
})
export class RaketPicturesModule {}
