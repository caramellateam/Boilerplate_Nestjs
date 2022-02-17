import { Strategy } from 'passport-local';

import { PassportStrategy } from '@nestjs/passport';

import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';

import { AuthService } from './auth.service';

@Injectable()

export class LocalStrategy extends PassportStrategy(Strategy, 'local') {
  constructor(private authService: AuthService) {
    super({
      passReqToCallback: true,
      usernameField: 'email',
    });
    this.authService = authService;
  }

  async validate(req: Request, email: string, password: string): Promise<any> {
    Logger.debug(`email: ${email} trying to LogIn`);
    const user = await this.authService.validateUser(email, password);
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
