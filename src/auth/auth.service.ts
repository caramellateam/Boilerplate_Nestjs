import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
// import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';

import User from '@src/users/entities/user.entity';
import { UserService } from '@src/users/user.service';
import ENCRYPT_UTIL from '@src/utils/encrypt.util';
import { DeepPartial } from 'typeorm';
// import { ITokenPayload } from './interfaces/payload.interface';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
    // private configService: ConfigService,
  ) {
    this.userService = userService;
    this.jwtService = jwtService;
    // this.configService = configService;
  }

  issueAccessToken(user: DeepPartial<User>): string {
    const accessToken = this.jwtService.sign({
      id: user.id,
      email: user.email,
    }, {
      expiresIn: '1h',
    });

    return accessToken;
  }

  issueRefreshToken(user: DeepPartial<User>): string {
    const refreshToken = this.jwtService.sign({
      id: user.id,
      email: user.email,
    }, {
      expiresIn: '7d',
    });
    return refreshToken;
  }

  async validateUser(email: string, password: string): Promise<DeepPartial<User> | null> {
    Logger.debug(`EMAIL: ${email}, PWD: ${password}`);
    const user = await this.userService.findOne({ email }, { secret: true });
    if (!user) throw new UnauthorizedException();

    const {
      hash, salt,
      ...userResult
    } = user;

    const verifyResult = ENCRYPT_UTIL.verify(password, hash, salt);
    if (!verifyResult) return new UnauthorizedException('Verify failed');

    return userResult;
  }

  async validateAndIssueAccessToken(refreshToken: string): Promise< string | undefined> {
    const data = this.jwtService.verify(
      refreshToken,
    );
    if (typeof data === 'string') {
      throw new UnauthorizedException({}, 'refreshToken Error');
    }

    const { id, email } = data;
    const user = await this.userService.findOne({ id, email });
    if (!user) throw new UnauthorizedException('User Not Found');
    return this.issueAccessToken(user);
  }

  async loginLocal(user: DeepPartial<User>)
  : Promise<{ accessToken: string, refreshToken: string }> {
    const accessToken = this.issueAccessToken(user);
    const refreshToken = this.issueRefreshToken(user);

    return {
      accessToken,
      refreshToken,
    };
  }

  // async issueAccessToken(user: DeepPartial<User): Promise<string> {
  // }
}
