import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import COMMON_UTIL from '@util/common.util';

const dbModule = !COMMON_UTIL.isProduction
  ? TypeOrmModule.forRoot({
    type: 'mariadb',
    username: 'fill-production-username',
    // NOTE USERNAME
    password: 'fill-production-password',
    // NOTE mysql password production
    host: 'fill-production-host',
    // NOTE Mysql Host
    database: 'fill-production-database',
    // NOTE MYSQL DATABASE
    entities: ['dist/**/*.entity.js'],
    port: 3307,
    synchronize: false,
    autoLoadEntities: true,
    retryDelay: 3000,
    retryAttempts: 10,
  })
  : TypeOrmModule.forRoot({
    type: 'oracle',
    username: 'fill-development-username',
    // NOTE USERNAME DEVELOPMENT
    password: 'fill-password',
    // NOTE mysql password DEVELOPMENT
    host: 'fill-development-host',
    // NOTE Mysql Host DEVELOPMENT
    database: 'fill-development-database',
    // NOTE MYSQL DATABASE DEVELOPMENT
    entities: ['dist/**/*.entity.js'],
    port: 3307,
    // synchronize: true,
    synchronize: false,
    autoLoadEntities: true,
    retryDelay: 3000,
    retryAttempts: 10,
  });

@Module({
  imports: [
    dbModule,
  ],
  exports: [
    dbModule,
  ],
})
class DBModule {

}

export default DBModule;
