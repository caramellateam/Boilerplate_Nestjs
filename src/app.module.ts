import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import DBModule from './typeorm_dev.module';
// NOTE 사용시에, typeorm.module.ts 로 변경

@Module({
  imports: [UserModule, DBModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
