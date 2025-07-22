import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from '../entities/user/entities/user.entity';
import { JwtStrategy } from './jwt.strategy';
import { jwtConstants } from './constant';
import { ConfigModule } from '@nestjs/config';
import { GoogleStrategy } from './google.strategy';
import googleOathConfig from './google-oath.config';
import { UserService } from 'src/entities/user/user.service';
import refreshJwtConfig from './refresh-jwt.config';



@Module({
  imports: [
    TypeOrmModule.forFeature([Users]),
    PassportModule,
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: jwtConstants.expiresIn },
    }),
    ConfigModule.forFeature(googleOathConfig),
    ConfigModule.forFeature(refreshJwtConfig),
  ],
  providers: [AuthService, JwtStrategy, GoogleStrategy, UserService],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}
