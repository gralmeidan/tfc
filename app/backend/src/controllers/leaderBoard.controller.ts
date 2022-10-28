import { Request, Response } from 'express';
import LeaderBoardService from '../services/leaderBoard.service';

export default class LeaderBoardController {
  constructor(private service = new LeaderBoardService()) {}

  public getByLocation = async (req: Request, res: Response) => {
    const { location } = req.params;

    const response = await this.service.getByLocation(
      location as 'home' | 'away',
    );

    res.status(200).json(response);
  };
}
