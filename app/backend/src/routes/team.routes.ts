import { Router } from 'express';
import TeamController from '../controllers/team.controller';

const TeamRouter = Router();
const controller = new TeamController();

TeamRouter.get('/', controller.getAll);

export default TeamRouter;
