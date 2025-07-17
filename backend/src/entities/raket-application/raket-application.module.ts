import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RaketApplication } from './entities/raket-application.entity';
import { RaketApplicationService } from './raket-application.service';
import { RaketApplicationController } from './raket-application.controller';
import { UserModule } from '../user/user.module';

@Module({
  imports: [TypeOrmModule.forFeature([RaketApplication]), UserModule],
  providers: [RaketApplicationService],
  controllers: [RaketApplicationController],
  exports: [RaketApplicationService],
})
export class RaketApplicationModule {}
