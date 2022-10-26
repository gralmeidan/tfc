import { Request, Response } from 'express';
import MatchService from '../services/match.service';

export default class MatchController {
  constructor(private service = new MatchService()) {}

  public getAll = async (req: Request, res: Response) => {
    const matches = await this.service.getAll(req.query);

    res.status(200).json(matches);
  };
}
