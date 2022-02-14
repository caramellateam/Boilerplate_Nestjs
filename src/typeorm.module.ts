import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ((process.env.NODE_ENV || 'development') === 'production')
        ? ['.production.env', '.env']
        : '.development.env',
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: configService.get('TYPEORM_TYPE') as 'oracle' | 'mysql' | 'mariadb' | 'mssql' | 'postgres' | 'sqlite',
        username: configService.get('TYPEORM_USERNAME') as string,
        password: configService.get('TYPEORM_PASSWORD') as string,
        connectString: configService.get('TYPEORM_CONNECTSTRING') as string,
        // NOTE oracle 활성화용

        // host: configService.get('TYPEORM_HOST') as string,
        // port: configService.get('TYPEORM_PORT') as number,
        // database: configService.get('TYPEORM_DATABASE') as string,
        // NOTE mysql 활성화용
        entities: ['dist/**/*.entity.js'],
        synchronize: false,
        authLoadEntities: true,
        retryDelay: 3000,
        retryAttempts: 1,
      }),
    }),
  ],
})
class DBModule {
}

export default DBModule;
