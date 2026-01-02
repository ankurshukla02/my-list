'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('users', [
      {
        id: 'user_001',
        username: 'john_doe',
        preferences: JSON.stringify({
          favoriteGenres: ['Action', 'SciFi'],
          dislikedGenres: ['Horror'],
        }),
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: 'user_002',
        username: 'jane_smith',
        preferences: JSON.stringify({
          favoriteGenres: ['Drama', 'Romance'],
          dislikedGenres: ['Action'],
        }),
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: 'user_003',
        username: 'alex_king',
        preferences: JSON.stringify({
          favoriteGenres: ['Comedy', 'Fantasy'],
          dislikedGenres: [],
        }),
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: 'user_004',
        username: 'priya_verma',
        preferences: JSON.stringify({
          favoriteGenres: ['SciFi', 'Drama'],
          dislikedGenres: ['Romance'],
        }),
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: 'user_005',
        username: 'rahul_mehta',
        preferences: JSON.stringify({
          favoriteGenres: ['Action'],
          dislikedGenres: ['Comedy'],
        }),
        created_at: new Date(),
        updated_at: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('users', null, {});
  },
};
