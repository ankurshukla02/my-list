'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('my_list', {
      id: {
        type: Sequelize.BIGINT.UNSIGNED,
        primaryKey: true,
        autoIncrement: true,
      },
      user_id: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      content_id: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      content_type: {
        type: Sequelize.TINYINT.UNSIGNED, // '1- movie', '2-tv_show'
        allowNull: false,
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
    });

    await queryInterface.addIndex('my_list', ['user_id']);
    await queryInterface.addConstraint('my_list', {
      fields: ['user_id', 'content_id', 'content_type'],
      type: 'unique',
      name: 'my_list_unique_user_content',
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('my_list');
    await queryInterface.sequelize.query(
      'DROP TYPE IF EXISTS "enum_my_list_content_type";'
    );
  },
};
