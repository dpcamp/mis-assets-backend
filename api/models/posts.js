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

  exports.Posts = sequelize.define('posts', {
    title: {
      type: Sequelize.STRING
    },
    content: {
      type: Sequelize.STRING
    }
  }, {
    freezeTableName: true
  });