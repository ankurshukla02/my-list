"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MyList = void 0;
const sequelize_1 = require("sequelize");
const sequelize_2 = require("../config/sequelize");
class MyList extends sequelize_1.Model {
}
exports.MyList = MyList;
MyList.init({
    id: {
        type: sequelize_1.DataTypes.BIGINT.UNSIGNED,
        primaryKey: true,
        autoIncrement: true,
    },
    user_id: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    content_id: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    content_type: {
        type: sequelize_1.DataTypes.TINYINT.UNSIGNED,
        allowNull: false,
    },
}, {
    sequelize: sequelize_2.sequelize,
    modelName: 'my_list',
    tableName: 'my_list',
});
