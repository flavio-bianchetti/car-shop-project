import { Car, carZodSchema, carVehicle } from '../interfaces/CarInterface';
import { idZodSchema } from '../interfaces/IDInterface';
import Service, { ServiceError } from '.';
import CarModel from '../models/Car';

class CarService extends Service<Car> {
  constructor(model = new CarModel()) {
    super(model);
  }

  create = async (obj: Car): Promise<Car | ServiceError | null> => {
    const parsed = carVehicle.safeParse(obj);
    if (!parsed.success) return { error: parsed.error };
    return this.model.create(obj);
  };

  read = async (): Promise<Car[]> => this.model.read();

  readOne = async (id: string): Promise<Car | ServiceError | null> => {
    const parsed = idZodSchema.safeParse({ id });
    if (!parsed.success) return { error: parsed.error };
    return this.model.readOne(id);
  };

  update = async (id: string, obj: Car): Promise<Car | null | ServiceError> => {
    const parsedId = idZodSchema.safeParse({ id });
    if (!parsedId.success) return { error: parsedId.error };
    const parsed = carZodSchema.safeParse(obj);
    if (!parsed.success) return { error: parsed.error };
    return this.model.update(id, obj);
  };

  public delete = (id: string): Promise<Car | null> => this.model.delete(id);
}

export default CarService;
