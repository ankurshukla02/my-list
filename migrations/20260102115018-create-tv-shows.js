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
        allowNull: false,
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
    });
  },

  async down(queryInterface, _Sequelize) {
    await queryInterface.dropTable('tv_shows');
  },
};
