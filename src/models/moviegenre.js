const { DataTypes } = require('sequelize');
const sequelize = require('../connection/mySqlDatabaseConnection.js');
const Catalog = require('./catalog.js');
const Genre = require('./genre.js');

const MovieGenre = sequelize.define('MovieGenre', {
}, {
    tableName: 'moviegenre',
    timestamps: false
});

Catalog.belongsToMany(Genre, { through: MovieGenre, foreignKey: 'genreID' });
Genre.belongsToMany(Catalog, { through: MovieGenre, foreignKey: 'movieID' });

module.exports = MovieGenre;