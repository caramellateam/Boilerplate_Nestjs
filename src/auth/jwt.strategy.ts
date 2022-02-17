import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
// import jwtConstants from './constants';

@Injectable()
class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(
    private configService: ConfigService,
  ) {
    super({
      issuer: 'KUUWANGE',
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      // secretOrKey: jwtConstants.accessSecret,
      secretOrKey: configService.get('JWT_SECRET'),
    });

    this.configService = configService;
    this.configService.get('JWT_SECRET');
    // NOTE configService get JWT_SECRET;
  }

  async validate(payload: any) {
    Logger.debug(`VALIDATE ${payload}`);
    return { ...payload };
  }
}

export default JwtStrategy;
