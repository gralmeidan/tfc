import { Router } from 'express';
import verifyToken from '../auth/verifyToken.middleware';
import UserController from '../controllers/user.controller';

const LoginRouter = Router();
const controller = new UserController();

LoginRouter.post('/', controller.login);

LoginRouter.use(verifyToken);

LoginRouter.get('/validate', controller.getOwnRole);

export default LoginRouter;
