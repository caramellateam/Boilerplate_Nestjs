import { Module } from '@nestjs/common';
import {
  APP_FILTER,
  APP_GUARD,
} from '@nestjs/core';
import { ConfigModule } from '@nestjs/config';
// NOTE DOTENV

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './users/user.module';
import { AuthModule } from './auth/auth.module';
import DBModule from './typeorm.module';
import JwtAuthGuard from './auth/jwt-auth.guard';
import GlobalExceptionFilter from './filters/global_exception.filter';

// NOTE 사용시에, typeorm.module.ts 로 변경

const CONF = ConfigModule.forRoot({
  envFilePath: ((process.env.NODE_ENV || 'development') === 'production')
    ? ['.production.env', '.env']
    : '.development.env',
  isGlobal: true,
});
@Module({
  imports: [
    CONF,
    DBModule,

    UserModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
    {
      provide: APP_FILTER,
      useClass: GlobalExceptionFilter,
    },
  ],
  exports: [
    CONF,
  ],
})
export class AppModule {}
