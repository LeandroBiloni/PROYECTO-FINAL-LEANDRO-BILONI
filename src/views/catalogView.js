const { DataTypes } = require('sequelize');
const sequelize = require('../connection/mySqlDatabaseConnection.js');

const CatalogView = sequelize.define('CatalogView', {
    movieID: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
    poster: DataTypes.STRING,
    title: DataTypes.STRING,
    category: DataTypes.STRING,
    genre: DataTypes.STRING,
    summary: DataTypes.TEXT,
    seasons: DataTypes.INTEGER,
    moviecast: DataTypes.STRING,
    trailer: DataTypes.STRING,
  }, {
    tableName: 'catalogview',
        timestamps: false
  });

module.exports = CatalogView;