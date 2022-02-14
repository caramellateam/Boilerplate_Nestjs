import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
// NOTE DOTENV

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import DBModule from './typeorm.module';
// NOTE 사용시에, typeorm.module.ts 로 변경

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ((process.env.NODE_ENV || 'development') === 'production')
        ? ['.production.env', '.env']
        : '.development.env',
      isGlobal: true,
    }),
    UserModule, DBModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
