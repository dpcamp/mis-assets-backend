'use strict';
module.exports = (sequelize, DataTypes) => {
  const PDQComputers = sequelize.define('pdq_computers', {
    computer_id: DataTypes.INTEGER,
    host_name: DataTypes.STRING,
    ad_last_logon: DataTypes.STRING,
    current_user: DataTypes.STRING,
    memory: DataTypes.STRING,
    os_name: DataTypes.STRING,
    os_service_pack: DataTypes.STRING,
    ad_when_created: DataTypes.STRING,
    status: DataTypes.STRING,
    online_user: DataTypes.STRING
  }, {
    underscored: true,
  });
  PDQComputers.associate = function(models) {
    PDQComputers.hasOne(models.users, { foreignKey:'user_name', sourceKey:'online_user'});
    PDQComputers.hasMany(models.pdq_applications, { foreignKey:'computer_id', sourceKey:'computer_id'});
    PDQComputers.hasMany(models.pdq_nic_ip, { foreignKey:'computer_id', sourceKey:'computer_id'});
    PDQComputers.hasMany(models.pdq_displays, { foreignKey:'computer_id', sourceKey:'computer_id'});

  };
  return PDQComputers;
};