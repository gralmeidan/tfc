import { Request, Response } from 'express';
import MatchService from '../services/match.service';

export default class MatchController {
  constructor(private service = new MatchService()) {}

  public getAll = async (req: Request, res: Response) => {
    const matches = await this.service.getAll(req.query);

    res.status(200).json(matches);
  };

  public create = async (req: Request, res: Response) => {
    const match = await this.service.create(req.body);

    res.status(201).json(match);
  };
}
