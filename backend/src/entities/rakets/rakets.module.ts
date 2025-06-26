import { Module } from '@nestjs/common';
import { RaketsService } from './rakets.service';
import { RaketsController } from './rakets.controller';

@Module({
  controllers: [RaketsController],
  providers: [RaketsService],
})
export class RaketsModule {}
