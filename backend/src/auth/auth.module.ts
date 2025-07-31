import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from '../entities/user/entities/user.entity';
import { UserModule } from '../entities/user/user.module';
import { JwtStrategy } from './jwt.strategy';
import { jwtConstants } from './constant';
import { ConfigModule } from '@nestjs/config';
import { GoogleStrategy } from './google.strategy';
import googleOathConfig from './google-oath.config';
import { UserService } from 'src/entities/user/user.service';
import refreshJwtConfig from './refresh-jwt.config';
import { SkillsModule } from 'src/entities/skills/skills.module';
import { RaketistaSkillModule } from 'src/entities/raketista-skill/raketista-skill.module';
import { Organization } from 'src/entities/organization/entities/organization.entity';



@Module({
  imports: [
    TypeOrmModule.forFeature([Users, Organization]),
    UserModule,
    PassportModule,
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: jwtConstants.expiresIn },
    }),
    ConfigModule.forFeature(googleOathConfig),
    ConfigModule.forFeature(refreshJwtConfig),
    SkillsModule,
    RaketistaSkillModule,
  ],
  providers: [AuthService, JwtStrategy, GoogleStrategy, UserService],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}
