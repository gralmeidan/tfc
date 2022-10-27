import RestError from '../error/RestError';
import Team from '../types/team.type';
import TeamModel from '../database/models/team.model';

export default class TeamService {
  constructor(private model = TeamModel) {}

  public getAll = async (): Promise<Team[]> => {
    const teams = await this.model.findAll();
    return teams;
  };

  public findById = async (id: number): Promise<Team> => {
    const team = await this.model.findByPk(id);
    if (!team) {
      throw new RestError(404, 'There is no team with such id!');
    }

    return team;
  };
}
