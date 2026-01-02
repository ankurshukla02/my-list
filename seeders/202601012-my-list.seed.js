'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    const now = new Date();

    const myListItems = [
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
      {
        user_id: 'user_002',
        content_id: 'movie_002',
        content_type: 1,
        created_at: now,
        updated_at: now,
      },
      {
        user_id: 'user_003',
        content_id: 'tv_002',
        content_type: 2,
        created_at: now,
        updated_at: now,
      },
      {
        user_id: 'user_004',
        content_id: 'movie_003',
        content_type: 1,
        created_at: now,
        updated_at: now,
      },
    ];

    for (const item of myListItems) {
      const existingItem = await queryInterface.rawSelect('my_list', {
        where: {
          user_id: item.user_id,
          content_id: item.content_id,
          content_type: item.content_type,
        },
      }, ['user_id']);

      if (!existingItem) {
        await queryInterface.bulkInsert('my_list', [item]);
      }
    }
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('my_list', null, {});
  },
};
