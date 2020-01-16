'use strict';
module.exports = (sequelize, DataTypes) => {
  const user_form = sequelize.define('user_form', {
    first_name: DataTypes.STRING,
    last_name: DataTypes.STRING,
    display_name: DataTypes.STRING,
    user_name: DataTypes.STRING,
    description: DataTypes.STRING,
    copy_user: DataTypes.STRING,
    create_mbx: DataTypes.BOOLEAN,
    sup_man_execs: DataTypes.BOOLEAN,
    home_drive: DataTypes.BOOLEAN,
    submitted_by: DataTypes.STRING,
    created_by: DataTypes.STRING,
    status: DataTypes.STRING
  }, {
    underscored: true,
  });
  user_form.associate = function(models) {
    // associations can be defined here
  };
  return user_form;
};