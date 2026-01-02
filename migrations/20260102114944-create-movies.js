'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('movies', {
      id: {
        type: Sequelize.STRING,
        primaryKey: true,
      },
      title: { type: Sequelize.STRING, allowNull: false },
      description: Sequelize.TEXT,
      genres: { type: Sequelize.JSON, allowNull: false },
      release_date: Sequelize.DATE,
      director: Sequelize.STRING,
      actors: { type: Sequelize.JSON, allowNull: false },
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
    await queryInterface.dropTable('movies');
  },
};
