import { Router } from 'express';
import UserController from '../controllers/user.controller';

const LoginRouter = Router();
const controller = new UserController();

LoginRouter.post('/', controller.login);

export default LoginRouter;
