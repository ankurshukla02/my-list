"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sequelize = void 0;
const sequelize_1 = require("sequelize");
const env_1 = require("../config/env");
const isTest = process.env.NODE_ENV === 'test';
exports.sequelize = new sequelize_1.Sequelize(isTest ? ':memory:' : env_1.database.name, isTest ? '' : env_1.database.user, isTest ? '' : env_1.database.password, {
    host: isTest ? '' : env_1.database.host,
    port: isTest ? 0 : Number(env_1.database.port),
    dialect: isTest ? 'sqlite' : env_1.database.dialect,
    logging: false, // ❗ disable SQL logs in prod
    pool: isTest ? undefined : {
        max: Number(env_1.database.poolMax) || 10,
        min: Number(env_1.database.poolMin) || 0,
        acquire: Number(env_1.database.poolAcquire) || 5000,
        idle: Number(env_1.database.poolIdle) || 10000,
    },
    define: {
        timestamps: true,
        underscored: true,
    },
});
