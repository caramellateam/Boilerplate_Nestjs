import { NestFactory } from '@nestjs/core';
import { Logger, ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import COMMON_UTIL from '@util/common.util';
import basicAuth from 'express-basic-auth';

import {
  utilities as nestWinstonModuleUtilities,
  WinstonModule,
} from 'nest-winston';
import winston from 'winston';
// import CloudWatchTransport from 'winston-cloudwatch';
// NOTE Cloud watch Logging 활성화
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';

import TransformInterceptor from '@src/interceptors/transform.interceptor';

import { AppModule } from './app.module';

process.on('SIGINT', () => {
  Logger.warn('\nGracefully shutting down from SIGINT (Ctrl-C)');
  process.exit(0);
});

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: {
      origin: COMMON_UTIL.isProduction ? 'https://api.caramella.kr' : 'http://localhost:8000',
      // NOTE CORS 해결을 위함
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
        // new CloudWatchTransport({
        //   name: 'Cloudwatch Logs',
        //   level: 'debug',
        //   logGroupName: COMMON_UTIL.isProduction ? 'production' : 'development',
        //   logStreamName: '###',
        //   awsAccessKeyId: '###',
        //   awsSecretKey: '###',
        //   awsRegion: 'ap-northeast-2',
        // eslint-disable-next-line max-len
        //   messageFormatter: (item) => (`${item.level}:  ${item.message} ${JSON.stringify(item.meta)}`),
        // }),
        // NOTE Cloud Watch Logging 활성화
      ],
    }),
  });
  // NOTE CORS & Winston 로깅 활성화 부분

  app.use(bodyParser.json({ limit: '50mb' }));
  app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

  const { isProduction } = COMMON_UTIL;

  app.enableCors({
    origin: true,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true,
  });
  // NOTE cors 적용 / http-credentials 적용

  app.useGlobalInterceptors(new TransformInterceptor());
  // NOTE api 본문 변환

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      disableErrorMessages: isProduction,
    }),
    // NOTE 파라미터 검증 글로벌 파이프라인
  );

  app.use(
    '/docs',
    basicAuth({
      users: {
        admin: 'admin',
      },
      challenge: true,
    }),
  );
  // NOTE SWAGGER DOCS 를 보호 하기 위한 basic-auth

  const config = new DocumentBuilder()
    .setTitle('CARAMELLA BACKEND API')
    // NOTE swagger title
    .setDescription('CARAMELLA Backend BoilerPlate')
    .setVersion(process.env.APP_VERSION || '0.0.0')
    .addTag(process.env.NODE_ENV || 'development')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);

  app.use(cookieParser());

  await app.listen(3000);
}
// NOTE 앱이 시작되는 부분
bootstrap();
