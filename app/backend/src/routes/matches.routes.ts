import { Router } from 'express';
import verifyToken from '../auth/verifyToken.middleware';
import MatchController from '../controllers/match.controller';

const MatchRouter = Router();
const controller = new MatchController();

MatchRouter.get('/', controller.getAll);
MatchRouter.post('/', verifyToken, controller.create);

MatchRouter.patch(
  '/:id/finish',
  verifyToken,
  controller.finishMatch,
);

MatchRouter.patch('/:id', verifyToken, controller.update);

export default MatchRouter;
