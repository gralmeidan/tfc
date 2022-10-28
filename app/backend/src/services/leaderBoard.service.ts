import * as db from 'sequelize';
import RestError from '../error/RestError';
import TeamModel from '../database/models/team.model';
import MatchModel from '../database/models/match.model';
import LeaderBoard, { UntreatedLeaderBoard } from '../types/leaderboard.type';
import { locationSchema } from './joi/leaderBoard.schemas';

export default class LeaderBoardService {
  constructor(private model = MatchModel) {}

  private defaultOptions = {
    home: {
      attributes: [
        [db.fn('COUNT', db.col('*')), 'totalGames'],
        [db.fn('SUM', db.col('home_team_goals')), 'goalsFavor'],
        [db.fn('SUM', db.col('away_team_goals')), 'goalsOwn'],
        [
          db.fn(
            'COUNT',
            db.fn(
              'IF',
              db.literal('(home_team_goals > away_team_goals)'),
              1,
              null,
            ),
          ),
          'totalVictories',
        ],
        [
          db.fn(
            'COUNT',
            db.fn(
              'IF',
              db.literal('(home_team_goals < away_team_goals)'),
              1,
              null,
            ),
          ),
          'totalLosses',
        ],
        [
          db.fn(
            'COUNT',
            db.fn(
              'IF',
              db.literal('(home_team_goals = away_team_goals)'),
              1,
              null,
            ),
          ),
          'totalDraws',
        ],
      ],
      include: [
        {
          model: TeamModel,
          attributes: [['team_name', 'name']],
          as: 'teamHome',
        },
      ],
      where: {
        inProgress: false,
      },
      group: 'home_team',
    },
    away: {
      attributes: [
        [db.fn('COUNT', db.col('*')), 'totalGames'],
        [db.fn('SUM', db.col('away_team_goals')), 'goalsFavor'],
        [db.fn('SUM', db.col('home_team_goals')), 'goalsOwn'],
        [
          db.fn(
            'COUNT',
            db.fn(
              'IF',
              db.literal('(away_team_goals > home_team_goals)'),
              1,
              null,
            ),
          ),
          'totalVictories',
        ],
        [
          db.fn(
            'COUNT',
            db.fn(
              'IF',
              db.literal('(away_team_goals < home_team_goals)'),
              1,
              null,
            ),
          ),
          'totalLosses',
        ],
        [
          db.fn(
            'COUNT',
            db.fn(
              'IF',
              db.literal('(away_team_goals = home_team_goals)'),
              1,
              null,
            ),
          ),
          'totalDraws',
        ],
      ],
      include: [
        {
          model: TeamModel,
          attributes: [['team_name', 'name']],
          as: 'teamAway',
        },
      ],
      where: {
        inProgress: false,
      },
      group: 'away_team',
    },
  } as {
    [key: string]: db.FindOptions;
  };

  private mapData = (data: UntreatedLeaderBoard) => {
    const totalPoints = data.totalVictories * 3 + data.totalDraws;
    const response = {
      ...data,
      name: data.teamHome ? data.teamHome.name : data.teamAway.name,
      goalsBalance: data.goalsFavor - data.goalsOwn,
      totalPoints,
      efficiency: ((totalPoints / (data.totalGames * 3)) * 100).toFixed(2),
    } as Partial<UntreatedLeaderBoard>;
    delete response.teamHome;
    delete response.teamAway;
    return response as LeaderBoard;
  };

  private sortData = (a: LeaderBoard, b: LeaderBoard) => {
    // Sorteia por vários valores de desempate ao invés de um só
    const params: (keyof LeaderBoard)[] = [
      'totalPoints',
      'goalsBalance',
      'totalVictories',
      'goalsFavor',
      'goalsOwn',
    ];

    let sort = 0;
    for (let i = 0; i < params.length; i += 1) {
      const compare = (b[params[i]] as number) - (a[params[i]] as number);
      if (compare !== 0) {
        sort = compare;
        break;
      }
    }
    return sort;
  };

  private postQuery = (data: UntreatedLeaderBoard[]) =>
    data.map(this.mapData).sort(this.sortData);

  public getByLocation = async (location: 'home' | 'away' = 'home') => {
    const { error } = locationSchema.validate(location);

    if (error) {
      throw new RestError(422, error.message);
    }

    // If you don't remove the weird stuff Sequelize does to the data
    // the sort functions won't work correctly
    const response = (await this.model
      .findAll(this.defaultOptions[location])
      .then(JSON.stringify)
      .then(JSON.parse)) as UntreatedLeaderBoard[];

    return this.postQuery(response);
  };
}
