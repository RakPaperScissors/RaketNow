import { Inject, Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, VerifyCallback } from 'passport-google-oauth20';
import { ConfigType } from '@nestjs/config';
import googleOathConfig from './google-oath.config';
import { Profile } from 'passport';
import { AuthService } from './auth.service';
import { Client } from 'socket.io/dist/client';
import { userRole } from 'src/entities/user/entities/user.entity';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor(
    @Inject(googleOathConfig.KEY)
    private googleConfiguration: ConfigType<typeof googleOathConfig>,
    private authService: AuthService,
  ) {
    super({
      clientID: String(googleConfiguration.clientID),
      clientSecret: String(googleConfiguration.clientSecret),
      callbackURL: String(googleConfiguration.callbackURL),
      scope: ['email', 'profile'],
      passReqToCallback: true,
    });
  }

  async validate(
    req: any,
    accessToken: string,
    refreshToken: string,
    profile: Profile,
    done: VerifyCallback,
  ) {
    const email = profile.emails?.[0]?.value ?? '';
    if (!email) {
      return done(new Error('Could not retrieve email from Google.'));
    }
    const googleProfile = {
      id: profile.id,
      email: email,
      firstName: profile.name?.givenName ?? '',
      lastName: profile.name?.familyName ?? '',
      profilePicture: profile.photos?.[0]?.value,
    };
    const tokenResponse = await this.authService.loginWithGoogle(googleProfile);
    done(null, tokenResponse);
  }
}