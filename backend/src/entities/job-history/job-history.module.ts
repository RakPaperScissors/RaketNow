import { Module } from '@nestjs/common';
import { JobHistoryService } from './job-history.service';
import { JobHistoryController } from './job-history.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JobHistory } from './entities/job-history.entity';
import { Raket } from '../rakets/entities/raket.entity';
import { Users } from '../user/entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([JobHistory, Raket, Users])],
  controllers: [JobHistoryController],
  providers: [JobHistoryService],
})
export class JobHistoryModule {}
