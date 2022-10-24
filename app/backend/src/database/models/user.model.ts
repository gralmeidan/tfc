import { STRING, Model, INTEGER } from 'sequelize';
import db from '.';

class UserModel extends Model {
  declare id: number;
  declare username: string;
  declare role: string;
  declare email: string;
  declare password: string;
}

UserModel.init(
  {
    id: {
      type: INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    username: STRING,
    role: STRING,
    email: STRING,
    password: STRING,
  },
  {
    underscored: true,
    sequelize: db,
    modelName: 'user',
    timestamps: false,
    tableName: 'users',
  },
);

export default UserModel;
