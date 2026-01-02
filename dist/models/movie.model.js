"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Movie = void 0;
const sequelize_1 = require("sequelize");
const sequelize_2 = require("../config/sequelize");
class Movie extends sequelize_1.Model {
}
exports.Movie = Movie;
Movie.init({
    id: {
        type: sequelize_1.DataTypes.STRING,
        primaryKey: true,
    },
    title: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    description: sequelize_1.DataTypes.TEXT,
    genres: {
        type: sequelize_1.DataTypes.JSON,
        allowNull: false,
    },
    releaseDate: sequelize_1.DataTypes.DATE,
    director: sequelize_1.DataTypes.STRING,
    actors: {
        type: sequelize_1.DataTypes.JSON,
        allowNull: false,
    },
}, {
    sequelize: sequelize_2.sequelize,
    modelName: 'movie',
    tableName: 'movies',
});
