import { Router } from 'express';
import LeaderBoardController from '../controllers/leaderBoard.controller';

const LeaderBoardRouter = Router();
const controller = new LeaderBoardController();

LeaderBoardRouter.get('/:location', controller.getByLocation);
LeaderBoardRouter.get('/', controller.getAll);

export default LeaderBoardRouter;
