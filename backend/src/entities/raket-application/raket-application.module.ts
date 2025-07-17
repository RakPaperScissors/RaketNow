import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RaketApplication } from './entities/raket-application.entity';
import { RaketApplicationService } from './raket-application.service';
import { RaketApplicationController } from './raket-application.controller';

@Module({
  imports: [TypeOrmModule.forFeature([RaketApplication])],
  providers: [RaketApplicationService],
  controllers: [RaketApplicationController],
  exports: [RaketApplicationService],
})
export class RaketApplicationModule {}
