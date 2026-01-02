import dotenv from 'dotenv';

dotenv.config();

export const env = {
  port: process.env.PORT || 3000,
  nodeEnv: process.env.NODE_ENV || 'development',
};


export const database = {
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  name: process.env.DB_DATABASE,
  dialect: process.env.DB_DIALECT || 'mysql',
  poolMax: process.env.DB_POOL_MAX || 10,
  poolMin: process.env.DB_POOL_MIN || 10,
  poolAcquire: process.env.DB_POOL_ACQUIRE || 30000,
  poolIdle: process.env.DB_POOL_IDLE || 10000
};