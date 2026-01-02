"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = require("./app");
const env_1 = require("./config/env");
const sequelize_1 = require("./config/sequelize");
const models_1 = require("./models");
async function startServer() {
    try {
        await sequelize_1.sequelize.authenticate();
        console.log('✅ Sequelize connected to MySQL');
        // Sync models
        await (0, models_1.syncDb)();
        app_1.app.listen(env_1.env.port, () => {
            console.log(`🚀 Server running on port ${env_1.env.port}`);
        });
    }
    catch (error) {
        console.error('❌ DB connection failed:', error);
        process.exit(1);
    }
}
startServer();
