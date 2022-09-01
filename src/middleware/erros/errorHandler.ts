import { Request, Response, NextFunction } from 'express';
import { ZodError } from 'zod';
import CustomError from './CustomError';

const typeErrors: Record<string, number> = {
  InvalidMongoId: 401,
  EntityNotFound: 404,
};

const erroMiddleware = (
  err: CustomError,
  _req: Request,
  res: Response,
  _next: NextFunction,
) => {
  const { name, message } = err;
  const httpStatus = typeErrors[name];
  if (!httpStatus) {
    return res.status(httpStatus).json({ message });
  } if (err instanceof ZodError) {
    return res.status(400).json({ message: err.issues });
  }
  return res.status(500).json({ message });
};

export default erroMiddleware;