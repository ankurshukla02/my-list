'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('tv_shows', {
      id: { type: Sequelize.STRING, primaryKey: true },
      title: { type: Sequelize.STRING, allowNull: false },
      description: Sequelize.TEXT,
      genres: { type: Sequelize.JSON, allowNull: false },
      episodes: { type: Sequelize.JSON, allowNull: false, defaultValue: [] },
      created_at: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
      updated_at: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
    });
  },

  async down(queryInterface, _Sequelize) {
    await queryInterface.dropTable('tv_shows');
  },
};
