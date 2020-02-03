'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('pdq_computers', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      computer_id: {
        type: Sequelize.INTEGER
      },
      host_name: {
        type: Sequelize.STRING
      },
      ad_last_logon: {
        type: Sequelize.STRING
      },
      current_user: {
        type: Sequelize.STRING
      },
      memory: {
        type: Sequelize.STRING
      },
      os_name: {
        type: Sequelize.STRING
      },
      os_service_pack: {
        type: Sequelize.STRING
      },
      ad_when_created: {
        type: Sequelize.STRING
      },
      status: {
        type: Sequelize.STRING
      },
      online_user: {
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
    return queryInterface.dropTable('PDQComputers');
  }
};