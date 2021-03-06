  'use strict';
  module.exports = (sequelize, DataTypes) => {
    const Computers = sequelize.define('computers', {
    computer_id: {
      type: DataTypes.STRING,
      primaryKey: true
    },
    computer_name: {
      type: DataTypes.STRING
    },
    computer_type: {
      type: DataTypes.STRING
    },
    ip_address: {
      type: DataTypes.STRING
    },
    mac_address: {
      type: DataTypes.STRING
    },
    mac_address: {
      type: DataTypes.STRING
    },
    installed_on: {
      type: DataTypes.DATE
    },
  }, {
    freezeTableName: true,
    timestamps: false,
    underscored: true
  });
  Computers.associate = function(models) {
    Computers.belongsToMany(models.users, { through: models.online_users, foreignKey:'computer_id'});
    Computers.hasOne(models.computer_attributes, {foreignKey: 'computer_id'});
  }
  return Computers; 
  };