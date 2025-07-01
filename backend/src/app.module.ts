import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './entities/user/user.module';
import { Users } from './entities/user/entities/user.entity';
import { OrganizationModule } from './entities/organization/organization.module';
import { RaketistaModule } from './entities/raketista/raketista.module';
import { Organization } from './entities/organization/entities/organization.entity';
import { Raketista } from './entities/raketista/entities/raketista.entity';
import { AuthModule } from './auth/auth.module';
import { RaketsModule } from './entities/rakets/rakets.module';
import { Raket } from './entities/rakets/entities/raket.entity';
import { RaketPicturesModule } from './entities/raket-pictures/raket-pictures.module';
import { RaketPictures } from './entities/raket-pictures/entities/raket-picture.entity';
import { SkillsModule } from './entities/skills/skills.module';
import { CertificationModule } from './entities/certification/certification.module';
import { JobHistoryModule } from './entities/job-history/job-history.module';

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
      entities: [Users, Organization, Raketista, Raket, RaketPictures],
      ssl:
        process.env.NODE_ENV === 'production'
          ? { rejectUnauthorized: false }
          : false,
      autoLoadEntities: true,
      synchronize: true, // do not use if not on dev-mode
    }),
    UserModule,
    OrganizationModule,
    RaketistaModule,
    AuthModule,
    RaketsModule,
    RaketPicturesModule,
    SkillsModule,
    CertificationModule,
    JobHistoryModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
