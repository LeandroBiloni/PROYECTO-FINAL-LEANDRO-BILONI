const { DataTypes } = require('sequelize');
const sequelize = require('../connection/mySqlDatabaseConnection.js');

const Category =  sequelize.define('Category', {
    categoryID: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
        unique: true
    },
    categoryName: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false
    }
},
    {
        tableName: 'category',
        timestamps: false
    });

module.exports = Category;