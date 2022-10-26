import Team from '../types/team.type';
import TeamModel from '../database/models/team.model';

export default class TeamService {
  constructor(private model = TeamModel) {}

  public getAll = async (): Promise<Team[]> => {
    const teams = await this.model.findAll();
    return teams;
  };
}
