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

  public finishMatch = async (req: Request, res: Response) => {
    const { id } = req.params;

    await this.service.update(Number(id), {
      inProgress: false,
    });

    res.status(200).json({
      message: 'Finished',
    });
  };

  public update = async (req: Request, res: Response) => {
    const { id } = req.params;

    const response = await this.service.update(
      Number(id),
      req.body,
    );

    res.status(200).json(response);
  };
}
