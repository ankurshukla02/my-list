import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../config/sequelize';

export class User extends Model {
  public id!: string;
  public username!: string;
  public preferences!: {
    favoriteGenres: string[];
    dislikedGenres: string[];
  };
}

User.init(
  {
    id: {
      type: DataTypes.STRING,
      primaryKey: true,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    preferences: {
      type: DataTypes.JSON,
      allowNull: false,
      defaultValue: { favoriteGenres: [], dislikedGenres: [] },
    },
  },
  {
    sequelize,
    modelName: 'user',
    tableName: 'users',
  }
);
