'use strict';
  module.exports = (sequelize, DataTypes) => {
    const ComputerAttributes = sequelize.define('computer_attributes', {
    cpu_vendor: {
      type: DataTypes.STRING
    },
    cpu_model: {
      type: DataTypes.STRING
    },
    cpu_speed: {
      type: DataTypes.STRING
    },
    display_adapter: {
      type: DataTypes.STRING
    },
    os_type: {
      type: DataTypes.STRING
    },
    os_service_pack: {
      type: DataTypes.STRING
    },
    os_serial: {
      type: DataTypes.STRING
    },
    memory_physical: {
      type: DataTypes.DECIMAL(18, 0)
    },    
    disks_size: {
      type: DataTypes.STRING
    },
  }, {
    freezeTableName: true,
    timestamps: false,
    underscored: true
  });
  ComputerAttributes.associate = function(models) {
  ComputerAttributes.belongsTo(models.computers, {foreignKey: 'computer_id', targetKey: 'computer_id'});

  }
  return ComputerAttributes; 
  };