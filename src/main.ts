import { NestFactory } from '@nestjs/core';
import bodyParser from 'body-parser';

import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(bodyParser.json({ limit: '50mb' }));
  app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

  await app.listen(3000);
}
// NOTE 앱이 시작되는 부분
bootstrap();
