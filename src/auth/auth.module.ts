import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';

import { UserModule } from '@src/users/user.module';

import AuthController from './auth.controller';
import { AuthService } from './auth.service';

import { LocalStrategy } from './local.strategy';
import JwtStrategy from './jwt.strategy';

@Module({
  imports: [
    UserModule,
    PassportModule,
    ConfigModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        secretOrPrivateKey: configService.get('JWT_SECRET'),
        signOptions: {
          expiresIn: '1h',
          issuer: 'KUUWANGE',
          encoding: 'utf-8',
          algorithm: 'HS512',
        },
      }),
      inject: [ConfigService],
    }),
  ],
  providers: [
    AuthService,
    JwtStrategy,
    LocalStrategy,
  ],
  exports: [
    AuthService,
  ],
  controllers: [AuthController],
})
export class AuthModule { }
