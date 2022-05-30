import { Router } from 'express';
import Controller from '../controllers';
import Middleware from '../middlewares';

class CustomRouter<T> {
  public router: Router;

  constructor() {
    this.router = Router();
  }

  public addRoute(
    controller: Controller<T>,
    middleware: Middleware<T>,
    route: string = controller.route,
  ) {
    this.router.get(route, controller.read);
    this.router.get(`${route}/:id`, controller.readOne);
    this.router.post(route, middleware.validate, controller.create);
    this.router.put(`${route}/:id`, controller.update);
    this.router.delete(`${route}/:id`, controller.delete);
  }
}

export default CustomRouter;