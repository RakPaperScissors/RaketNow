import { registerAs } from '@nestjs/config';
import { JwtModuleOptions, JwtSignOptions } from '@nestjs/jwt';
import { jwtConstants } from './constant';

export default registerAs(
  'refresh-jwt',
  (): JwtSignOptions => ({
    secret: jwtConstants.secret,
    expiresIn: jwtConstants.expiresIn,
  }),
);
