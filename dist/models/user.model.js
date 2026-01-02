"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const sequelize_1 = require("sequelize");
const sequelize_2 = require("../config/sequelize");
class User extends sequelize_1.Model {
}
exports.User = User;
User.init({
    id: {
        type: sequelize_1.DataTypes.STRING,
        primaryKey: true,
    },
    username: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    preferences: {
        type: sequelize_1.DataTypes.JSON,
        allowNull: false,
        defaultValue: { favoriteGenres: [], dislikedGenres: [] },
    },
}, {
    sequelize: sequelize_2.sequelize,
    modelName: 'user',
    tableName: 'users',
});
