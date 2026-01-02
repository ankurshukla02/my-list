import { Sequelize } from 'sequelize';
import { database } from '../config/env';

const isTest = process.env.NODE_ENV === 'test';

export const sequelize = new Sequelize(
  isTest ? ':memory:' : (database.name as string),
  isTest ? '' : (database.user as string),
  isTest ? '' : database.password,
  {
    host: isTest ? '' : database.host,
    port: isTest ? 0 : Number(database.port),
    dialect: isTest ? 'sqlite' : database.dialect as any,

    logging: false, // ❗ disable SQL logs in prod

    pool: isTest ? undefined : {
      max: Number(database.poolMax) || 10,
      min: Number(database.poolMin) || 0,
      acquire: Number(database.poolAcquire) || 5000,
      idle: Number(database.poolIdle) || 10000,
    },

    define: {
      timestamps: true,
      underscored: true,
    },
  }
);
