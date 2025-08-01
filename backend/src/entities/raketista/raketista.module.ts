import { Module } from '@nestjs/common';
import { RaketistaService } from './raketista.service';
import { RaketistaController } from './raketista.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Raketista } from './entities/raketista.entity';
import { Rating } from '../rating/entities/rating.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Raketista, Rating])
  ],
  controllers: [RaketistaController],
  providers: [RaketistaService],
  exports: [RaketistaService],
})
export class RaketistaModule {}
