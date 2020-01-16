'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('user_forms', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      first_name: {
        type: Sequelize.STRING
      },
      last_name: {
        type: Sequelize.STRING
      },
      display_name: {
        type: Sequelize.STRING
      },
      user_name: {
        type: Sequelize.STRING
      },
      description: {
        type: Sequelize.STRING
      },
      copy_user: {
        type: Sequelize.STRING
      },
      create_mbx: {
        type: Sequelize.BOOLEAN
      },
      sup_man_execs: {
        type: Sequelize.BOOLEAN
      },
      home_drive: {
        type: Sequelize.BOOLEAN
      },
      submitted_by: {
        type: Sequelize.STRING
      },
      created_by: {
        type: Sequelize.STRING
      },
      status: {
        type: Sequelize.STRING
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('user_forms');
  }
};