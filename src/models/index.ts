import { sequelize } from '../config/sequelize';
import { User } from './user.model';
import { Movie } from './movie.model';
import { TVShow } from './tvShow.model';
import { MyList } from './myList.model';

// Define associations
User.hasMany(MyList, { foreignKey: 'user_id', as: 'myLists' });
MyList.belongsTo(User, { foreignKey: 'user_id', as: 'user' });

Movie.hasMany(MyList, { foreignKey: 'content_id', constraints: false, scope: { content_type: 1 } });
TVShow.hasMany(MyList, { foreignKey: 'content_id', constraints: false, scope: { content_type: 2 } });

MyList.belongsTo(Movie, { foreignKey: 'content_id', constraints: false, as: 'movie' });
MyList.belongsTo(TVShow, { foreignKey: 'content_id', constraints: false, as: 'tvShow' });

export const db = {
  sequelize,
  User,
  Movie,
  TVShow,
  MyList,
};

export const syncDb = async () => {
  await sequelize.sync({ force: false });
  console.log('✅ All models synced');
};