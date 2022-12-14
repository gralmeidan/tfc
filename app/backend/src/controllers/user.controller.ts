import { Request, Response } from 'express';
import generateToken from '../auth/generateToken';
import UserService from '../services/user.service';

export default class UserController {
  constructor(private service = new UserService()) {}

  public login = async (req: Request, res: Response) => {
    const { email, password } = req.body;

    const user = await this.service.autenticate(email, password);

    const token = await generateToken(user);

    res.status(200).json({ token });
  };

  public getOwnRole = async (req: Request, res: Response) => {
    const { role } = req.user;

    res.status(200).json({ role });
  };
}
