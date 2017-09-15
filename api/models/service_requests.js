module.exports = (sequelize, DataTypes) => {
  const ServiceRequests = sequelize.define('service_requests', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: false,
    },
    problem_type: {
      type: DataTypes.STRING
    },
    title: {
      type: DataTypes.STRING
    },
    responsibility: {
      type: DataTypes.STRING
    },
    urgency: {
      type: DataTypes.STRING
    },
    priority: {
      type: DataTypes.STRING
    },
    status: {
      type: DataTypes.INTEGER
    },
  }, {
      freezeTableName: true,
      timestamps: false,
      underscored: true
    });
  return ServiceRequests;
};