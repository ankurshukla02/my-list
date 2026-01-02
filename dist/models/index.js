"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.syncDb = exports.db = void 0;
const sequelize_1 = require("../config/sequelize");
const user_model_1 = require("./user.model");
const movie_model_1 = require("./movie.model");
const tvShow_model_1 = require("./tvShow.model");
const myList_model_1 = require("./myList.model");
// Define associations
user_model_1.User.hasMany(myList_model_1.MyList, { foreignKey: 'user_id', as: 'myLists' });
myList_model_1.MyList.belongsTo(user_model_1.User, { foreignKey: 'user_id', as: 'user' });
movie_model_1.Movie.hasMany(myList_model_1.MyList, { foreignKey: 'content_id', constraints: false, scope: { content_type: 1 } });
tvShow_model_1.TVShow.hasMany(myList_model_1.MyList, { foreignKey: 'content_id', constraints: false, scope: { content_type: 2 } });
myList_model_1.MyList.belongsTo(movie_model_1.Movie, { foreignKey: 'content_id', constraints: false, as: 'movie' });
myList_model_1.MyList.belongsTo(tvShow_model_1.TVShow, { foreignKey: 'content_id', constraints: false, as: 'tvShow' });
exports.db = {
    sequelize: sequelize_1.sequelize,
    User: user_model_1.User,
    Movie: movie_model_1.Movie,
    TVShow: tvShow_model_1.TVShow,
    MyList: myList_model_1.MyList,
};
const syncDb = async () => {
    await sequelize_1.sequelize.sync({ force: false });
    console.log('✅ All models synced');
};
exports.syncDb = syncDb;
