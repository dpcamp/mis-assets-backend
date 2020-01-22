'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.transaction(t => {
      return Promise.all([
        queryInterface.addColumn('user_forms', 'start_date', {
          type: Sequelize.DataTypes.DATE
        }, { transaction: t })
       
      ]);
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.transaction(t => {
      return Promise.all([
        queryInterface.removeColumn('user_forms', 'start_date',  { transaction: t }),
       
      ]);
    });
  }
};
