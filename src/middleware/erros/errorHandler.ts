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
  if (err instanceof ZodError) {
    const messageError = err.issues
      .map(({ path }) => `O campo ${path[0]} recebeu um valor inesperado.`);
    return res.status(400).json({ message: messageError });
  } if (!httpStatus) {
    return res.status(httpStatus).json({ message });
  } return res.status(500).json({ message });
};

export default erroMiddleware;