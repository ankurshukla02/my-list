import { app } from './app';
import { env } from './config/env';
import { sequelize } from './config/sequelize';
import { syncDb } from './models';

async function startServer() {
  try {
    await sequelize.authenticate();
    console.log('✅ Sequelize connected to MySQL');

    // Sync models
    await syncDb();

    app.listen(env.port, () => {
      console.log(`🚀 Server running on port ${env.port}`);
    });
  } catch (error) {
    console.error('❌ DB connection failed:', error);
    process.exit(1);
  }
}

startServer();
