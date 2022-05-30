import CustomRouter from './routes/router';
import App from './app';

import CarController from './controllers/Car';
import VehicleMiddleware from './middlewares/Vehicle';

import { Car } from './interfaces/CarInterface';

const server = new App();

const carController = new CarController();
const vehicleMiddleware = new VehicleMiddleware();

const carRouter = new CustomRouter<Car>();
carRouter.addRoute(carController, vehicleMiddleware);

server.addRouter(carRouter.router);

export default server;
