const { DataTypes } = require('sequelize');
const mysqldb = require('../config/mysql_database_config');

const Forms = mysqldb.define('Forms', {
    formID : {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    formName : {
        type: DataTypes.STRING,
        allowNull: false
    },
    formKey : {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    }
});

const Responses = mysqldb.define('Responses', {
    formID : {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Forms,
            key: 'formID'
        }
    },
    responseTimestamp : {
        type: DataTypes.STRING,
        allowNull: false
    },
    answerData : {
        type: DataTypes.JSON,
        allowNull: false
    }
});

module.exports = { Forms, Responses };