const { DataTypes } = require('sequelize');
const sequelize = require('../connection/mySqlDatabaseConnection.js');
const Catalog = require('./catalog.js');
const Actor = require('./actor.js');

const MovieCast = sequelize.define('MovieCast', {
}, {
    tableName: 'moviecast',
    timestamps: false
});

Catalog.belongsToMany(Actor, { through: MovieCast, foreignKey: 'actorID' });
Actor.belongsToMany(Catalog, { through: MovieCast, foreignKey: 'movieID' });

module.exports = MovieCast;