import { Module } from '@nestjs/common';
import { RaketsService } from './rakets.service';
import { RaketsController } from './rakets.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Raket } from './entities/raket.entity';
import { Users } from '../user/entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Raket, Users])],
  controllers: [RaketsController],
  providers: [RaketsService],
})
export class RaketsModule {}
