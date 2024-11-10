const { Sequelize } = require('sequelize');

const mysqldb = new Sequelize('feedback_system', 'user_dbadmin', '1234', {
    host: 'localhost',
    dialect: 'mysql'
});

module.exports = mysqldb;