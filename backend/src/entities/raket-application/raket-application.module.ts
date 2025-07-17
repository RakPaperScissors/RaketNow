import { Module } from '@nestjs/common';
import { RaketApplicationService } from './raket-application.service';
import { RaketApplicationController } from './raket-application.controller';

@Module({
  controllers: [RaketApplicationController],
  providers: [RaketApplicationService],
})
export class RaketApplicationModule {}
