'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    const now = new Date();

    await queryInterface.bulkInsert('my_list', [
      // user_001
      {
        user_id: 'user_001',
        content_id: 'movie_001',
        content_type: 1, // movie
        created_at: now,
        updated_at: now,
      },
      {
        user_id: 'user_001',
        content_id: 'tv_001',
        content_type: 2, // tv_show
        created_at: now,
        updated_at: now,
      },

      // user_002
      {
        user_id: 'user_002',
        content_id: 'movie_002',
        content_type: 1,
        created_at: now,
        updated_at: now,
      },
      {
        user_id: 'user_002',
        content_id: 'tv_002',
        content_type: 2,
        created_at: now,
        updated_at: now,
      },

      // user_003
      {
        user_id: 'user_003',
        content_id: 'movie_003',
        content_type: 1,
        created_at: now,
        updated_at: now,
      },

      // user_004
      {
        user_id: 'user_004',
        content_id: 'tv_003',
        content_type: 2,
        created_at: now,
        updated_at: now,
      },

      // user_005
      {
        user_id: 'user_005',
        content_id: 'movie_004',
        content_type: 1,
        created_at: now,
        updated_at: now,
      },
      {
        user_id: 'user_005',
        content_id: 'tv_004',
        content_type: 2,
        created_at: now,
        updated_at: now,
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('my_list', null, {});
  },
};
