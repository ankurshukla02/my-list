import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../config/sequelize';

export class TVShow extends Model {
  public id!: string;
  public title!: string;
  public description!: string;
  public genres!: string[];
  public episodes!: any[];
}

TVShow.init(
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
    episodes: {
      type: DataTypes.JSON,
      allowNull: false,
      defaultValue: [],
    },
  },
  {
    sequelize,
    modelName: 'tv_show',
    tableName: 'tv_shows',
  }
);
