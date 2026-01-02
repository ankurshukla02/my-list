import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../config/sequelize';

export class MyList extends Model {
  public id!: number;
  public user_id!: string;
  public content_id!: string;
  public content_type!: number; // 1 for movie, 2 for tv_show
}

MyList.init(
  {
    id: {
      type: DataTypes.BIGINT.UNSIGNED,
      primaryKey: true,
      autoIncrement: true,
    },
    user_id: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    content_id: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    content_type: {
      type: DataTypes.TINYINT.UNSIGNED,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: 'my_list',
    tableName: 'my_list',
  }
);