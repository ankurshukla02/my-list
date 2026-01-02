"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TVShow = void 0;
const sequelize_1 = require("sequelize");
const sequelize_2 = require("../config/sequelize");
class TVShow extends sequelize_1.Model {
}
exports.TVShow = TVShow;
TVShow.init({
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
    episodes: {
        type: sequelize_1.DataTypes.JSON,
        allowNull: false,
        defaultValue: [],
    },
}, {
    sequelize: sequelize_2.sequelize,
    modelName: 'tv_show',
    tableName: 'tv_shows',
});
