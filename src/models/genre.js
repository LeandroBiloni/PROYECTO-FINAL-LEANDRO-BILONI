const { DataTypes } = require('sequelize');
const sequelize = require('../connection/mySqlDatabaseConnection.js');

const Genre =  sequelize.define('Genre', {
    genreID: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
        unique: true
    },
    genreName: {
        type: DataTypes.STRING,
        unique: true
    }
},
    {
        tableName: 'genre',
        timestamps: false
    });

module.exports = Genre;