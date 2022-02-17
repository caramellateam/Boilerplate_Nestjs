import {
  Controller,
  Get,
  Post,
  Request,
  Response,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { AuthGuard } from '@nestjs/passport';

import express from 'express';

import {
  Public,
  RefreshTokenPublic,
} from '@decorator/isPublic.decorator';
import COMMON_UTIL from '@util/common.util';

import { AuthService } from './auth.service';
// import { ITokenPayload } from './interfaces/payload.interface';

@Controller('auth')
class AuthController {
  constructor(
    private authService: AuthService,
    // private userService: UserService,
  ) {
    this.authService = authService;
    // this.userService = userService;
  }

  @ApiTags('Auth')
  @Public()
  @UseGuards(AuthGuard('local'))
  @Post('login')
  async loginAction(@Request() req: express.Request, @Response() res: express.Response) {
    if (req.user) {
      const { accessToken, refreshToken } = await this.authService.loginLocal(req.user);

      const body = {
        statusCode: 200,
        error: '',
        message: '',
        ...(COMMON_UTIL.makeResponseData({
          access_token: accessToken,
          refresh_token: refreshToken,
        })),
      };

      res.cookie('refresh_token', refreshToken, {
        expires: new Date(new Date().getTime() + 30 * 1000),
        sameSite: 'strict',
        httpOnly: true,
      });
      res.send(body);
      return body;
    }

    throw new Error('Erorr While LogIn');
  }

  @RefreshTokenPublic()
  @Get('refresh')
  async refreshAccessToken(@Request() req: express.Request) {
    if (req.cookies.refresh_token) {
      const refreshToken = req.cookies.refresh_token;
      const accessToken = await this.authService.validateAndIssueAccessToken(refreshToken);

      return {
        data: {
          access_token: accessToken,
        },
      };
    }
    throw new UnauthorizedException('RefreshToken Error');
  }

  // @Get('test')
  // async testAction() {
  //   return {
  //     data: 'LoggedIn',
  //   };
  // }
}

export default AuthController;
