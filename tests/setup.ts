import { sequelize } from '../src/config/sequelize';

beforeAll(async () => {
  await sequelize.authenticate();
});

afterAll(async () => {
  await sequelize.close();
});
