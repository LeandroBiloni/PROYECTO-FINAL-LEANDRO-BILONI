const { DataTypes } = require('sequelize');
const sequelize = require('../connection/mySqlDatabaseConnection.js');

const Catalog =  sequelize.define('Catalog', {
    movieID: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
        unique: true
    },
    poster: {
        type: DataTypes.STRING,
        default: null
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    categoryID: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    summary: {
        type: DataTypes.TEXT
    },
    seasons: {
        type: DataTypes.STRING(10)
    },
    trailer: {
        type: DataTypes.STRING
    }
},
    {
        tableName: 'catalog',
        timestamps: false
    });

module.exports = Catalog;