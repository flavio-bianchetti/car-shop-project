import { Schema, model as createModel, Document } from 'mongoose';
import { Car } from '../interfaces/CarInterface';
import MongoModel from './MongoModel';

interface CarDocument extends Car, Document {}

const carSchema = new Schema<CarDocument>(
  {
    model: String,
    year: Number,
    status: String,
    color: String,
    buyValue: Number,
    doorsQty: Number,
    seatsQty: Number,
  },
  {
    // solução encontrada em:
    // https://stackoverflow.com/questions/13699784/mongoose-v-property-hide
    versionKey: false,
  },
);

class CarModel extends MongoModel<Car> {
  constructor(model = createModel('Cars', carSchema)) {
    super(model);
  }
}

export default CarModel;
