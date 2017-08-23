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

const db = {};

db.Sequelize = Sequelize; 
db.sequelize = sequelize; 

//Gets models

db.users = require('./models/users.js')(sequelize,Sequelize);
db.phones = require('./models/phones.js')(sequelize,Sequelize);
db.userPhones = sequelize.define('userPhones')

//Sequelize Associations

db.users.belongsToMany(db.phones, {through: 'userPhones'});
db.phones.belongsToMany(db.users, {as: 'owners', through: 'userPhones'});

// Sync SQL with Sequelize Models USE CAUTION
sequelize.sync();

module.exports = db;