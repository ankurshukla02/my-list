import { Sequelize } from 'sequelize';
import { database } from '../config/env';

export const sequelize = new Sequelize(
  database.name as string,
  database.user as string,
  database.password,
  {
    host: database.host,
    port: Number(database.port),
    dialect: 'mysql',

    logging: false, // ❗ disable SQL logs in prod

    pool: {
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
