// ========== Cars Routes
// import all modules
import { Router as ExpressRouter } from 'express';
import upload from 'express-fileupload';
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
  checkAddCarBrandForm,
  checkUpdateCarBrandForm,
  checkDeleteCarBrandForm,
  checkGetAllCarBrandsQueries,
  checkGetCarBrandQueries,
} from '../middlewares/cars';

namespace CarsRoutesModul {
	export class CarsRoutes extends RouterModule.Router {
	  constructor() {
	    super();
	    this.expressRouter.use(upload({
	      createParentPath: true,
	    }));
	    this.routes();
	  }

	  public routes(): void {
	    this.expressRouter.post('/model', isLoggedIn, checkAddCarModelForm, carsControlerModule.CarsControllers.addCarModel);
	    this.expressRouter.get('/model', isLoggedIn, checkGetAllCarModelsQueries, carsControlerModule.CarsControllers.getCarModels);
	    this.expressRouter.put('/model/:id', isLoggedIn, checkUpdateCarModelForm, carsControlerModule.CarsControllers.updateCarModel);
	    this.expressRouter.delete('/model/:id', isLoggedIn, checkDeleteCarModelForm, carsControlerModule.CarsControllers.deleteCarModel);
	    this.expressRouter.post('/brand', isLoggedIn, checkAddCarBrandForm, carsControlerModule.CarsControllers.addCarBrand);
	    this.expressRouter.put('/brand/:id', isLoggedIn, checkUpdateCarBrandForm, carsControlerModule.CarsControllers.updateCarBrand);
	    this.expressRouter.delete('/brand/:id', isLoggedIn, checkDeleteCarBrandForm, carsControlerModule.CarsControllers.deleteCarBrand);
	    this.expressRouter.get('/brand', isLoggedIn, checkGetAllCarBrandsQueries, carsControlerModule.CarsControllers.getCarBrands);
	    this.expressRouter.get('/brand/:id', isLoggedIn, checkGetCarBrandQueries, carsControlerModule.CarsControllers.getCarBrand);
	  }

	  public get carsRoutes(): ExpressRouter {
	    return this.expressRouter;
	  }
	}
}

export default new CarsRoutesModul.CarsRoutes();
