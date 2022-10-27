import { BOOLEAN, INTEGER, Model } from 'sequelize';
import db from '.';
import TeamModel from './team.model';
// import OtherModel from './OtherModel';

class MatchModel extends Model {
  declare id: number;
  declare homeTeam: number;
  declare homeTeamGoals: number;
  declare awayTeam: number;
  declare awayTeamGoals: number;
  declare inProgress: boolean;
}

MatchModel.init(
  {
    id: {
      type: INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    homeTeam: INTEGER,
    homeTeamGoals: INTEGER,
    awayTeam: INTEGER,
    awayTeamGoals: INTEGER,
    inProgress: {
      type: BOOLEAN,
      defaultValue: true,
    },
  },
  {
    underscored: true,
    sequelize: db,
    modelName: 'match',
    timestamps: false,
    tableName: 'matches',
  },
);

MatchModel.belongsTo(TeamModel, {
  foreignKey: 'homeTeam',
  as: 'teamHome',
});

MatchModel.belongsTo(TeamModel, {
  foreignKey: 'awayTeam',
  as: 'teamAway',
});

export default MatchModel;
