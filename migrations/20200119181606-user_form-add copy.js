'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.transaction(t => {
      return Promise.all([
        queryInterface.addColumn('user_forms', 'employee_id', {
          type: Sequelize.DataTypes.STRING
        }, { transaction: t }),
        queryInterface.addColumn('user_forms', 'job_title', {
          type: Sequelize.DataTypes.STRING,
        }, { transaction: t }),
        queryInterface.addColumn('user_forms', 'building', {
          type: Sequelize.DataTypes.STRING,
        }, { transaction: t }),
        queryInterface.addColumn('user_forms', 'needs_computer', {
          type: Sequelize.DataTypes.BOOLEAN,
        }, { transaction: t }),
        queryInterface.addColumn('user_forms', 'needs_ax', {
          type: Sequelize.DataTypes.BOOLEAN,
        }, { transaction: t }),
        queryInterface.addColumn('user_forms', 'needs_ice', {
          type: Sequelize.DataTypes.BOOLEAN,
        }, { transaction: t }),
        queryInterface.addColumn('user_forms', 'needs_stellar', {
          type: Sequelize.DataTypes.BOOLEAN,
        }, { transaction: t }),
        queryInterface.addColumn('user_forms', 'needs_onbase', {
          type: Sequelize.DataTypes.BOOLEAN,
        }, { transaction: t }),
        queryInterface.addColumn('user_forms', 'needs_dl', {
          type: Sequelize.DataTypes.BOOLEAN,
        }, { transaction: t }),
        queryInterface.addColumn('user_forms', 'needs_scan', {
          type: Sequelize.DataTypes.BOOLEAN,
        }, { transaction: t }),
        queryInterface.addColumn('user_forms', 'needs_pdf', {
          type: Sequelize.DataTypes.BOOLEAN,
        }, { transaction: t }),
        queryInterface.addColumn('user_forms', 'needs_autocad', {
          type: Sequelize.DataTypes.BOOLEAN,
        }, { transaction: t }),
        queryInterface.addColumn('user_forms', 'needs_publisher', {
          type: Sequelize.DataTypes.BOOLEAN,
        }, { transaction: t }),
        queryInterface.addColumn('user_forms', 'needs_visio', {
          type: Sequelize.DataTypes.BOOLEAN,
        }, { transaction: t }),
        queryInterface.addColumn('user_forms', 'needs_shoretel', {
          type: Sequelize.DataTypes.BOOLEAN,
        }, { transaction: t }),
        queryInterface.addColumn('user_forms', 'needs_sec', {
          type: Sequelize.DataTypes.BOOLEAN,
        }, { transaction: t }),
        queryInterface.addColumn('user_forms', 'needs_deskphone', {
          type: Sequelize.DataTypes.BOOLEAN,
        }, { transaction: t }),
        queryInterface.addColumn('user_forms', 'needs_cell', {
          type: Sequelize.DataTypes.BOOLEAN,
        }, { transaction: t }),
        queryInterface.addColumn('user_forms', 'pc_number', {
          type: Sequelize.DataTypes.STRING,
        }, { transaction: t }),
        queryInterface.addColumn('user_forms', 'share_mbx', {
          type: Sequelize.DataTypes.STRING,
        }, { transaction: t }),
        queryInterface.addColumn('user_forms', 'phone_ext', {
          type: Sequelize.DataTypes.STRING,
        }, { transaction: t }),
       
      ]);
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.transaction(t => {
      return Promise.all([
        queryInterface.removeColumn('user_forms', 'employee_id',  { transaction: t }),
        queryInterface.removeColumn('user_forms', 'job_title',  { transaction: t }),
        queryInterface.removeColumn('user_forms', 'building',  { transaction: t }),
        queryInterface.removeColumn('user_forms', 'needs_computer',  { transaction: t }),
        queryInterface.removeColumn('user_forms', 'needs_ax',  { transaction: t }),
        queryInterface.removeColumn('user_forms', 'needs_ice',  { transaction: t }),
        queryInterface.removeColumn('user_forms', 'needs_stellar',  { transaction: t }),
        queryInterface.removeColumn('user_forms', 'needs_onbase',  { transaction: t }),
        queryInterface.removeColumn('user_forms', 'needs_dl',  { transaction: t }),
        queryInterface.removeColumn('user_forms', 'needs_scan',  { transaction: t }),
        queryInterface.removeColumn('user_forms', 'needs_pdf',  { transaction: t }),
        queryInterface.removeColumn('user_forms', 'needs_autocad',  { transaction: t }),
        queryInterface.removeColumn('user_forms', 'needs_publisher',  { transaction: t }),
        queryInterface.removeColumn('user_forms', 'needs_visio',  { transaction: t }),
        queryInterface.removeColumn('user_forms', 'needs_shoretel',  { transaction: t }),
        queryInterface.removeColumn('user_forms', 'needs_sec',  { transaction: t }),
        queryInterface.removeColumn('user_forms', 'needs_deskphone',  { transaction: t }),
        queryInterface.removeColumn('user_forms', 'needs_cell',  { transaction: t }),
        queryInterface.removeColumn('user_forms', 'pc_number',  { transaction: t }),
        queryInterface.removeColumn('user_forms', 'share_mbx',  { transaction: t }),
        queryInterface.removeColumn('user_forms', 'phone_ext', { transaction: t }),
      ]);
    });
  }
};
