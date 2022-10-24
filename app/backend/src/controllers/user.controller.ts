import { Request, Response } from 'express';
import generateToken from '../auth/generateToken';
import UserService from '../services/user.service';

export default class UserController {
  constructor(private service = new UserService()) {}

  public login = async (req: Request, res: Response) => {
    const { username, password } = req.body;

    const user = await this.service.autenticate(username, password);

    const token = await generateToken(user);

    res.status(200).json({ token });
  };
}
