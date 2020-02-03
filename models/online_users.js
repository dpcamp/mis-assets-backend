  'use strict';
module.exports = (sequelize, DataTypes) => {
  const OnlineUsers = sequelize.define('online_users', {
    db_id: DataTypes.STRING, 
    session_id: DataTypes.STRING, 
    disconnected: DataTypes.BOOLEAN, 
    last_update_date: DataTypes.DATE},
    {
      freezeTableName: true,
      timestamps: false,
      underscored: true
    });
    OnlineUsers.associate = function(models) {}
    return OnlineUsers; 
};
