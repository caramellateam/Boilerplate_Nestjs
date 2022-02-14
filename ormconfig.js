const isProduction = (process.env.NODE_ENV || 'development') === 'production';

// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config({
  path: isProduction
    ? '.production.env'
    : '.development.env',
});

module.exports = {
  type: process.env.TYPEORM_TYPE,
  username: process.env.TYPEORM_USERNAME,
  password: process.env.TYPEORM_PASSWORD,
  connectString: process.env.TYPEORM_CONNECTSTRING,

  // port: process.env.TYPEORM_PORT
  // host: process.env.TYOPEORM_HOST,
  database: 'admin',
  entities: ['./dist/**/*.entity.js'],
  synchronize: false,
  authLoadEntities: true,
  retryDelay: 3000,
  retryAttempts: 1,
  migrations: isProduction ? ['./migrations/production/*.ts'] : ['./migrations/development/*.ts'],
  cli: {
    entitiesDir: isProduction ? './entities/production' : './entities/development',
    migrationsDir: isProduction ? './migrations/production' : './migrations/development',
  },
};
