import { Response, NextFunction } from 'express';
import Middleware, { RequestWithBody, ResponseError } from '.';
import { Vehicle } from '../interfaces/VehicleInterface';

class VehicleMiddleware extends Middleware<Vehicle> {
  private $route: string;

  constructor(route = '/cars') {
    super();
    this.$route = route;
  }

  get route() {
    return this.$route;
  }
  
  private isNotValidTypes = (body: Vehicle): boolean => !(
    typeof body.model === 'string'
      && typeof body.year === 'number'
      && typeof body.color === 'string'
      && typeof body.buyValue === 'number'
  );

  validate = (
    req: RequestWithBody<Vehicle>,
    res: Response<ResponseError | NextFunction | void>,
    next: NextFunction,
  ): typeof res | NextFunction | void => {
    const { body }: { body: Vehicle } = req;
    const structure = ['model', 'year', 'color', 'buyValue'];
    for (let index = 0; index < structure.length; index += 1) {
      // solução adaptada de:
      // https://stackoverflow.com/questions/48653543/hasownproperty-with-more-than-one-property
      if (!Object.prototype.hasOwnProperty.call(body, structure[index])
        || this.isNotValidTypes(body)) {
        return res.status(400).json({ error: 'Bad request' });
      }
    }
    next();
  };
}

export default VehicleMiddleware;
