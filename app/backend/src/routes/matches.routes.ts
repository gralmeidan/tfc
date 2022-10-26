import { Router } from 'express';
import MatchController from '../controllers/match.controller';

const MatchRouter = Router();
const controller = new MatchController();

MatchRouter.get('/', controller.getAll);

export default MatchRouter;
