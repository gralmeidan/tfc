import * as bcrypt from 'bcryptjs';
import User from '../types/user.type';
import RestError from '../error/RestError';
import UserModel from '../database/models/user.model';

export default class UserService {
  constructor(private model = UserModel) {}

  public autenticate = async (
    email: string,
    password: string,
  ): Promise<User> => {
    if (!email || !password) {
      throw new RestError(422, 'Email and Password are required');
    }

    const response = (await this.model.findOne({
      where: { email },
    })) as unknown as { dataValues: User };

    if (!response) {
      throw new RestError(404, 'User not found');
    }

    const user = { ...response.dataValues };

    if (!(await bcrypt.compare(password, user.password || ''))) {
      throw new RestError(401, 'Invalid password');
    }

    delete user.password;

    return user;
  };
}
