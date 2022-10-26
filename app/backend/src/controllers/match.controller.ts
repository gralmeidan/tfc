import { Request, Response } from 'express';
import MatchService from '../services/match.service';

export default class MatchController {
  constructor(private service = new MatchService()) {}

  public getAll = async (_req: Request, res: Response) => {
    const matches = await this.service.getAll();

    res.status(200).json(matches);
  };
}
