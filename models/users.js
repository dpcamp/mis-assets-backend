  'use strict';
  module.exports = (sequelize, DataTypes) => {
    const Users = sequelize.define('users', {
    first_name: {
      type: DataTypes.STRING
    },
    last_name: {
      type: DataTypes.STRING
    },
    email: {
      type: DataTypes.STRING
    },
    title: {
      type: DataTypes.STRING
    },
    department: {
      type: DataTypes.STRING
    },
    user_name: {
      type: DataTypes.STRING,
      primaryKey: true
    },
    display_name: {
      type: DataTypes.STRING
    },
  }, {
    freezeTableName: true,
    timestamps: false,
    underscored: true
  });
  Users.associate = function(models) {
    Users.belongsToMany(models.phones, {through: 'user_phones', foreignKey:'user_name' });
    Users.belongsToMany(models.service_requests, {
      through:{
        model: models.open_tickets,
        unique: false,
        foreignKey:'service_request_id'
      } 
    });
    Users.belongsToMany(models.computers, { through: models.online_users, foreignKey:'user_name'})

  }
  return Users; 
  };