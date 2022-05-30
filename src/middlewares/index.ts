import { Request, Response, NextFunction } from 'express';

export type ResponseError = {
  error: unknown;
};

export interface RequestWithBody<T> extends Request {
  body: T;
}

enum MiddlewareErrors {
  internal = 'Internal Server Error',
  payload = 'Payload is required',
}

abstract class Middleware<T> {
  abstract route: string;

  protected errors = MiddlewareErrors;

  abstract validate(
    req: RequestWithBody<T>,
    res: Response<ResponseError | NextFunction | void>,
    next: NextFunction,
  ): typeof res | NextFunction | void;
}

export default Middleware;
