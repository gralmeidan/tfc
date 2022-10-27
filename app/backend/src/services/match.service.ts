import { AnySchema } from 'joi';
import Match, { NewMatch } from '../types/match.type';
import MatchModel from '../database/models/match.model';
import TeamModel from '../database/models/team.model';
import {
  newMatchSchema,
  querySchema,
  updateSchema,
} from './joi/match.schemas';
import RestError from '../error/RestError';
import TeamService from './team.service';

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
    const q = query
      ? await this.validateInput(query, querySchema)
      : query;

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
    const value = await this.validateInput(match, newMatchSchema);

    const { id } = await this.model.create(value);
    const response = await this.model.findByPk(id);

    return response;
  };

  public update = async (
    id: number,
    changes: Partial<Omit<Match, 'id'>>,
  ) => {
    const value = await this.validateInput(changes, updateSchema);

    await this.model.update(value, {
      where: {
        id,
      },
    });

    const response = await this.model.findByPk(id);

    return response;
  };

  public validateInput = async (
    input: Partial<Match>,
    schema: AnySchema,
  ) => {
    const { value, error } = schema.validate(input);

    if (error) {
      throw new RestError(422, error.message);
    }

    // Retrieves all passed teams then checks if they exist
    const teamIds = [input.homeTeam, input.awayTeam].filter(
      Boolean,
    ) as number[];

    // TeamService.findById will automatically throw an error if team
    // doesn't exist
    await Promise.all(
      teamIds.map(async (id) => new TeamService().findById(id)),
    );

    return value;
  };
}
