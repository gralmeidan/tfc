import * as jwt from 'jsonwebtoken';
import User from '../types/user.type';

export default function generateToken(user: User) {
  const secret = process.env.JWT_SECRET || 'secret';
  return jwt.sign(user, secret, {
    algorithm: 'HS256',
    expiresIn: '7d',
  });
}
