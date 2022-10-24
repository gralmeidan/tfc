import * as bcrypt from 'bcryptjs';
import RestError from '../error/RestError';
import UserModel from '../database/models/user.model';

export default class UserService {
  constructor(private model = UserModel) {}

  public autenticate = async (
    username: string,
    password: string,
  ): Promise<boolean> => {
    const user = await this.model.findOne({
      where: { username },
    });

    if (!user) {
      throw new RestError(404, 'User not found');
    }

    return bcrypt.compare(password, user.password);
  };
}
