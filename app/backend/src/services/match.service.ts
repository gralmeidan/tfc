import Match, { NewMatch } from '../types/match.type';
import MatchModel from '../database/models/match.model';
import TeamModel from '../database/models/team.model';
import { newMatchSchema, querySchema } from './joi/match.schemas';
import RestError from '../error/RestError';

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
    query?: Partial<Omit<Match, 'teamHome' | 'teamAway'>>,
  ): Promise<MatchModel[]> => {
    const { value: q, error } = querySchema.validate(query);

    if (error) {
      throw new RestError(422, error.message);
    }

    const matches = await this.model.findAll({
      ...this.defaultOptions,
      where: q,
    });

    if (!matches.length && query) {
      throw new RestError(404, 'No matches were found');
    }

    return matches;
  };

  public create = async (match: NewMatch) => {
    const { value, error } = newMatchSchema.validate(match);

    if (error) {
      throw new RestError(422, error.message);
    }

    const { id } = await this.model.create(value);
    const response = await this.model.findByPk(id);

    return response;
  };
}
