import { Module } from '@nestjs/common';
import { JobHistoryService } from './job-history.service';
import { JobHistoryController } from './job-history.controller';

@Module({
  controllers: [JobHistoryController],
  providers: [JobHistoryService],
})
export class JobHistoryModule {}
