import { NestFactory } from '@nestjs/core';
import bodyParser from 'body-parser';
import COMMON_UTIL from '@utils/common.util';

import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const app = await NestFactory.create(AppModule, {
    cors: {
      origin: COMMON_UTIL.isProduction ? 'https://api.caramella.kr' : 'http://localhost:8000',
      // origin: 'http://localhost:8000, https://localhost:8000, https://*.caramella.kr/',
      credentials: true,
    },
    logger: WinstonModule.createLogger({
      format: winston.format.uncolorize(),
      transports: [
        new winston.transports.Console({
          level: COMMON_UTIL.isProduction ? 'info' : 'debug',
          format: winston.format.combine(
            winston.format.timestamp(),
            winston.format.ms(),
            nestWinstonModuleUtilities.format.nestLike(),
          ),
        }),
        new CloudWatchTransport({
          name: 'Cloudwatch Logs',
          level: 'debug',
          logGroupName: COMMON_UTIL.isProduction ? 'production' : 'development',
          logStreamName: '###',
          awsAccessKeyId: '###',
          awsSecretKey: '###',
          awsRegion: 'ap-northeast-2',
          messageFormatter: (item) => (`${item.level}:  ${item.message} ${JSON.stringify(item.meta)}`),
        }),
      ],
    }),
  });

  app.use(bodyParser.json({ limit: '50mb' }));
  app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

  await app.listen(3000);
}
// NOTE 앱이 시작되는 부분
bootstrap();
