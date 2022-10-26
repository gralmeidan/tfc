import Match from '../types/match.type';
import MatchModel from '../database/models/match.model';
import TeamModel from '../database/models/team.model';

export default class MatchService {
  private defaultOptions = {
    include: [
      {
        model: TeamModel,
        as: 'teamHome',
        attributes: { exclude: ['id'] },
      },
      {
        model: TeamModel,
        as: 'teamAway',
        attributes: { exclude: ['id'] },
      },
    ],
  };

  constructor(private model = MatchModel) {}

  public getAll = async (
    query?: Partial<Match>,
  ): Promise<MatchModel[]> => {
    const matches = await this.model.findAll({
      ...this.defaultOptions,
      where: query,
    });

    return matches;
  };
}
