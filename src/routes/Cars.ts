// ========== Cars Routes
// import all modules
import { Router as ExpressRouter } from 'express';
import RouterModule from './Router';

// import all controllers
import carsControlerModule from '../controllers/Cars';

// import all middlewares
import { isLoggedIn } from '../middlewares/auth';
import { checkAddCarModelForm } from '../middlewares/cars';

namespace CarsRoutesModul {
	export class CarsRoutes extends RouterModule.Router {
	  constructor() {
	    super();
	    this.routes();
	  }

	  public routes(): void {
	    this.expressRouter.post('/model', isLoggedIn, checkAddCarModelForm, carsControlerModule.CarsControllers.addCarModel);
	  }

	  public get carsRoutes(): ExpressRouter {
	    return this.expressRouter;
	  }
	}
}

export default new CarsRoutesModul.CarsRoutes();
