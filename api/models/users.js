  module.exports = (sequelize, DataTypes) => {
    const Users = sequelize.define('Users', {
    givenName: {
      type: DataTypes.STRING
    },
    sn: {
      type: DataTypes.STRING
    },
    mail: {
      type: DataTypes.STRING
    },
    title: {
      type: DataTypes.STRING
    },
    department: {
      type: DataTypes.STRING
    },
    sAMAccountName: {
      type: DataTypes.STRING,
      primaryKey: true
    },
    displayName: {
      type: DataTypes.STRING
    },
  }, {
    freezeTableName: true,
    timestamps: false

  });
  return Users; 
  };