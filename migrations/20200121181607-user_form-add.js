'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.transaction(t => {
      return Promise.all([
        queryInterface.changeColumn('user_forms', 'id', {
          type: Sequelize.DataTypes.UUID
        }, { transaction: t })
       
      ]);
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.transaction(t => {
      return Promise.all([
        queryInterface.changeColumn('user_forms', 'id', {type: Sequelize.DataTypes.INTEGER }, { transaction: t }),
       
      ]);
    });
  }
};
