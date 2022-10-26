import { Router } from 'express';
import TeamController from '../controllers/team.controller';

const TeamRouter = Router();
const controller = new TeamController();

TeamRouter.get('/', controller.getAll);
TeamRouter.get('/:id', controller.findById);

export default TeamRouter;
