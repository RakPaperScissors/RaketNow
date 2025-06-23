import { Module } from '@nestjs/common';
import { RaketistaService } from './raketista.service';
import { RaketistaController } from './raketista.controller';

@Module({
  controllers: [RaketistaController],
  providers: [RaketistaService],
})
export class RaketistaModule {}
