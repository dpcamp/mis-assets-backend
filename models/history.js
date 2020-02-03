'use strict';
module.exports = (sequelize, DataTypes) => {
  const history = sequelize.define('history', {
    user_name: DataTypes.STRING,
    event: DataTypes.STRING,
    data: DataTypes.STRING
  }, {});
  history.associate = function(models) {
    // associations can be defined here
  };
  return history;
};