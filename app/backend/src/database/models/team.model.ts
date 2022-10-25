import { STRING, Model, INTEGER } from 'sequelize';
import db from '.';

class TeamModel extends Model {
  declare id: number;
  declare teamName: string;
}

TeamModel.init(
  {
    id: {
      type: INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    teamName: STRING,
  },
  {
    underscored: true,
    sequelize: db,
    modelName: 'team',
    timestamps: false,
    tableName: 'teams',
  },
);

export default TeamModel;
