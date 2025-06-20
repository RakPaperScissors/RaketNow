import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Users } from './entities/users/user.entity';
import { RaketistaProfile } from './entities/users/raketistaProfile.entity'; 
import { Organization } from './entities/users/organization.entity';
import { Raket } from './entities/rakets/rakets.entity';

//raketistaProfile folder
import {Certification} from './entities/raketistaProfile/certifications.entity';
import {JobHistory} from './entities/raketistaProfile/jobHistory.entity';
import {Skills} from './entities/raketistaProfile/skills.entity';
import { Review } from './entities/rakets/reviews.entity';
import { RaketApplication } from './entities/rakets/raketApplications.entity';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT || '5432'),
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      entities: [Users, RaketistaProfile, Organization, Raket, Certification, JobHistory, Skills, Review, RaketApplication],
      ssl:
        process.env.NODE_ENV === 'production'
          ? { rejectUnauthorized: false }
          : false,
      autoLoadEntities: true,
      synchronize: true, // do not use if not on dev-mode
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
