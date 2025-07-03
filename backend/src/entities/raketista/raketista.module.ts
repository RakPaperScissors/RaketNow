import { Module } from '@nestjs/common';
import { RaketistaService } from './raketista.service';
import { RaketistaController } from './raketista.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Raketista } from './entities/raketista.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Raketista])],
  controllers: [RaketistaController],
  providers: [RaketistaService],
  exports: [RaketistaService],
})
export class RaketistaModule {}
