import { Request, Response } from 'express';
import Controller, { RequestWithBody, ResponseError } from '.';
import CarService from '../services/Car';
import { Car } from '../interfaces/CarInterface';

class CarController extends Controller<Car> {
  private $route: string;

  constructor(service = new CarService(), route = '/cars') {
    super(service);
    this.$route = route;
  }

  get route() {
    return this.$route;
  }

  create = async (
    req: RequestWithBody<Car>,
    res: Response<Car | ResponseError>,
  ): Promise<typeof res> => {
    const { body } = req;
    try {
      const car = await this.service.create(body);
      if (!car) return res.status(404).json({ error: this.errors.notFound });
      if ('error' in car) return res.status(400).json(car);
      return res.status(201).json(car);
    } catch (err) {
      return res.status(500).json({ error: this.errors.internal });
    }
  };

  read = async (
    _req: Request,
    res: Response<Car[] | ResponseError>,
  ): Promise<typeof res> => {
    try {
      const cars = await this.service.read();
      return res.status(200).json(cars);
    } catch (error) {
      return res.status(500).json({ error: this.errors.internal });
    }
  };

  readOne = async (
    req: Request<{ id: string }>,
    res: Response<Car | ResponseError>,
  ): Promise<typeof res> => {
    const { id } = req.params;
    try {
      const car = await this.service.readOne(id);
      if (!car) return res.status(404).json({ error: this.errors.notFound });
      if ('error' in car) {
        return res.status(400).json({ error: this.errors.idLength });
      }
      return res.status(200).json(car);
    } catch (error) {
      return res.status(500).json({ error: this.errors.internal });
    }
  }; 

  update = async (
    req: Request<{ id: string }>,
    res: Response<Car | ResponseError>,
  ): Promise<typeof res> => {
    const { id } = req.params;
    if (!id) return res.status(400).json({ error: this.errors.requiredId });

    try {
      const { body } = req;
      const car = await this.service.update(id, body);
      if (!car) return res.status(404).json({ error: this.errors.notFound });
      if ('error' in car) {
        return res.status(400).json({ error: this.errors.idLength });
      }
      return res.status(200).json(car);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: this.errors.internal });
    }
  };

  delete = async (
    req: Request<{ id: string }>,
    res: Response<Car | ResponseError>,
  ): Promise<typeof res> => {
    const { id } = req.params;
    if (!id) return res.status(400).json({ error: this.errors.requiredId });
    try {
      const car = await this.service.delete(id);
      if (car === null) {
        return res.status(404)
          .json({ error: this.errors.notFound });
      }
      if ('error' in car) return res.status(400).json(car);

      return res.status(204).send();
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: this.errors.internal });
    }
  };
}

export default CarController;
