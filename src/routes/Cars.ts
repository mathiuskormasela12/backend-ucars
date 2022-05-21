// ========== Cars Routes
// import all modules
import { Router as ExpressRouter } from 'express';
import RouterModule from './Router';

// import all controllers
import carsControlerModule from '../controllers/Cars';

// import all middlewares
import { isLoggedIn } from '../middlewares/auth';
import {
  checkAddCarModelForm,
  checkGetAllCarModelsQueries,
  checkUpdateCarModelForm,
  checkDeleteCarModelForm,
} from '../middlewares/cars';

namespace CarsRoutesModul {
	export class CarsRoutes extends RouterModule.Router {
	  constructor() {
	    super();
	    this.routes();
	  }

	  public routes(): void {
	    this.expressRouter.post('/model', isLoggedIn, checkAddCarModelForm, carsControlerModule.CarsControllers.addCarModel);
	    this.expressRouter.get('/model', isLoggedIn, checkGetAllCarModelsQueries, carsControlerModule.CarsControllers.getCarModels);
	    this.expressRouter.put('/model/:id', isLoggedIn, checkUpdateCarModelForm, carsControlerModule.CarsControllers.updateCarModel);
	    this.expressRouter.delete('/model/:id', isLoggedIn, checkDeleteCarModelForm, carsControlerModule.CarsControllers.deleteCarModel);
	  }

	  public get carsRoutes(): ExpressRouter {
	    return this.expressRouter;
	  }
	}
}

export default new CarsRoutesModul.CarsRoutes();
