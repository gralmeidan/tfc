import { NextFunction, Request, Response } from 'express';
import * as jwt from 'jsonwebtoken';
import RestError from '../error/RestError';
import User from '../types/user.type';

export default async function verifyToken(
  req: Request,
  _res: Response,
  next: NextFunction,
) {
  try {
    const secret = process.env.JWT_SECRET || 'secret';
    const token = req.headers.authorization;

    if (!token) {
      throw new Error('Authorization token not found');
    }

    const { payload } = jwt.verify(token, secret) as jwt.JwtPayload;

    req.user = payload as User;
    next();
  } catch (err) {
    throw new RestError(401, 'Token must be a valid token');
  }
}
