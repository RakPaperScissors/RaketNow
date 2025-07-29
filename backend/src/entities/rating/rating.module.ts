import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Rating } from './entities/rating.entity';
import { RatingService } from './rating.service';
import { RatingController } from './rating.controller';
import { Raket } from '../rakets/entities/raket.entity';
import { RaketApplication } from '../raket-application/entities/raket-application.entity';
import { Users } from '../user/entities/user.entity';
import { UserModule } from 'src/entities/user/user.module';
import { RaketsModule } from 'src/entities/rakets/rakets.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Rating, Users, RaketApplication, Raket]),
    forwardRef(() => UserModule),
    forwardRef(() => RaketsModule),
  ],
  controllers: [RatingController],
  providers: [RatingService],
  exports: [RatingService],
})
export class RatingModule {}
