import { Request, Response } from 'express';
import TeamService from '../services/team.service';

export default class TeamController {
  constructor(private service = new TeamService()) {}

  public getAll = async (req: Request, res: Response) => {
    const teams = await this.service.getAll();

    res.status(200).json(teams);
  };
}
