const Sequelize = require ('sequelize')
    //winston = require('winston')
;


const sequelize = new Sequelize(process.env.DB_TABLE, process.env.DB_USER, process.env.DB_PASS, {
    host: process.env.DB_HOST,
    dialect: process.env.DB_DIALECT,
    //logging: logger,
    pool: {
        max: 9,
        min: 0,
        idle: 10000
    }
});
/*
const logger = new(winston.Logger)({
    level: 'debug',
    transports: [
        new(winston.transports.Console)(),
        new(winston.transports.File)({filename: './logfile.log'})
    ]
});
*/

const db = {};

Op = Sequelize.Op;
db.Sequelize = Sequelize; 
db.sequelize = sequelize; 

//Gets models

db.users = require('./models/users.js')(sequelize,Sequelize);

db.serviceRequests = require('./models/service_requests.js')(sequelize,Sequelize);
db.openTickets = sequelize.define('open_tickets')

db.phones = require('./models/phones.js')(sequelize,Sequelize);
db.userPhones = sequelize.define('user_phones');
db.onlineUsers = sequelize.define('online_users', {db_id: Sequelize.STRING, session_id: Sequelize.STRING, disconnected: Sequelize.BOOLEAN, last_update_date: Sequelize.DATE});


db.computer = require('./models/computers.js')(sequelize,Sequelize);
db.computerAttributes = require('./models/computer_attributes.js')(sequelize,Sequelize);

//Sequelize Associations

db.users.belongsToMany(db.phones, {through: db.userPhones, foreignKey:'user_name' });
db.phones.belongsToMany(db.users, {as: 'owners', through: db.userPhones, foreignKey:'phone_id'});

db.users.belongsToMany(db.serviceRequests, {through: db.openTickets, foreignKey:'request_user', otherKey:'service_request_id'});
db.serviceRequests.belongsTo(db.users, {foreignKey: 'request_user'});

db.users.belongsToMany(db.computer, { through: db.onlineUsers, foreignKey:'user_name'})
db.computer.belongsToMany(db.users, { through: db.onlineUsers, foreignKey:'computer_id'});

db.computerAttributes.belongsTo(db.computer, {foreignKey: 'computer_id', targetKey: 'computer_id'});
db.computer.hasOne(db.computerAttributes, {foreignKey: 'computer_id'});

// Sync SQL with Sequelize Models USE CAUTION
//sequelize.sync({force:true});

module.exports = db;