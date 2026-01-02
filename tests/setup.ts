import { sequelize } from '../src/config/sequelize';

// Force test environment for database config
process.env.NODE_ENV = 'test';

beforeAll(async () => {
  await sequelize.authenticate();
  // Sync all models for tests
  await sequelize.sync({ force: true });
});

afterAll(async () => {
  await sequelize.close();
});
