import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../config/sequelize';

export class Movie extends Model {
  public id!: string;
  public title!: string;
  public description!: string;
  public genres!: string[];
  public releaseDate!: Date;
  public director!: string;
  public actors!: string[];
}

Movie.init(
  {
    id: {
      type: DataTypes.STRING,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: DataTypes.TEXT,
    genres: {
      type: DataTypes.JSON,
      allowNull: false,
    },
    releaseDate: DataTypes.DATE,
    director: DataTypes.STRING,
    actors: {
      type: DataTypes.JSON,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: 'movie',
    tableName: 'movies',
  }
);
