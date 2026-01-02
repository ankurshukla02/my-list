import { sequelize } from '../src/config/sequelize';
import '../src/models'; // Import all models to register them

// Force test environment for database config
process.env.NODE_ENV = 'test';

beforeAll(async () => {
  await sequelize.authenticate();
  // Sync all models for tests
  await sequelize.sync({ force: true });

  // Run seeders
  const movieSeeder = require('../seeders/20260101-movies.seed.js');
  const tvShowSeeder = require('../seeders/20260101-tv-shows.seed.js');
  const userSeeder = require('../seeders/20260101-users.seed.js');

  await movieSeeder.up(sequelize.getQueryInterface(), sequelize.constructor);
  await tvShowSeeder.up(sequelize.getQueryInterface(), sequelize.constructor);
  await userSeeder.up(sequelize.getQueryInterface(), sequelize.constructor);
});

afterAll(async () => {
  await sequelize.close();
});
