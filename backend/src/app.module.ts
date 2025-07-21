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
import { Skills } from './entities/skills/entities/skill.entity';
import { CertificationModule } from './entities/certification/certification.module';
import { JobHistoryModule } from './entities/job-history/job-history.module';
import { RaketistaSkillModule } from './entities/raketista-skill/raketista-skill.module';
import { RaketistaSkill } from './entities/raketista-skill/entities/raketista-skill.entity';
import { ConversationModule } from './entities/conversation/conversation.module';
import { MessageModule } from './entities/message/message.module';
import { Message } from './entities/message/entities/message.entity';
import { Conversation } from './entities/conversation/entities/conversation.entity';
import { RaketApplicationModule } from './entities/raket-application/raket-application.module';
import { NotificationModule } from './entities/notification/notification.module';
import { ProfileModule } from './profile/profile.module';

@Module({
  imports: [
    ConfigModule.forRoot({isGlobal: true}),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT || '5432'),
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      entities: [Users, Organization, Raketista, Raket, RaketPictures, RaketistaSkill, Skills, Message, Conversation],
      // ssl: process.env.DB_SSL === 'true'
      // ? { rejectUnauthorized: false }
      // : false,
      ssl:
        process.env.NODE_ENV === 'production'
          ? { rejectUnauthorized: false } 
          : process.env.DB_SSL === 'true',
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
    JobHistoryModule,
    RaketistaSkillModule,
    ConversationModule,
    RaketApplicationModule,
    NotificationModule,
    MessageModule,
    ProfileModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
