const { DataTypes } = require('sequelize');
const sequelize = require('../connection/mySqlDatabaseConnection.js');

const Actor =  sequelize.define('Actor', {
    actorID: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
    },
    actorName: {
        type: DataTypes.STRING,
        unique: true
    }
},
    {
        tableName: 'actor',
        timestamps: false
    });

module.exports = Actor;