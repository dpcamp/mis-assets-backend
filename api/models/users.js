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
  return Users; 
  };