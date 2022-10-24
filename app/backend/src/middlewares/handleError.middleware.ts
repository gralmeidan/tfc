import { NextFunction, Request, Response } from 'express';
import RestError from '../error/RestError';

export default function handleError(
  err: Error | RestError,
  _req: Request,
  res: Response,
  _next: NextFunction,
) {
  if ('statusCode' in err) {
    return res.status(err.statusCode).json({
      message: err.message,
    });
  }

  console.log(err);
  res.status(500).json({
    message: 'Something went wrong',
  });
}
