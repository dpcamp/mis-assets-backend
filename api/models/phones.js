const Sequelize = require ('sequelize');

const sequelize = new Sequelize('mis-assets', 'mis', 'm!s@cc3ss', {
    host: '192.168.235.129',
    dialect: 'mssql',
    pool: {
        max: 9,
        min: 0,
        idle: 10000
    }
});

  exports.Phones = sequelize.define('Telephones', {
    FullNumber: {
      type: Sequelize.STRING
    },
    PhoneModel: {
      type: Sequelize.STRING
    },
    Location: {
      type: Sequelize.STRING
    }
  }, {
    freezeTableName: true,
    timestamps: false

  });