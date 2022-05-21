// ========== Cars Controllers
// import all modules
import { Request as ExpressRequest, Response as ExpressResponse } from 'express';
import { response } from '../helpers';
import CarModels from '../models/carModels';

namespace CarsControllersModule {
	export class CarsControllers {
	  public static async addCarModel(
	    req: ExpressRequest,
	    res: ExpressResponse,
	  ): Promise<ExpressResponse> {
	    const { modelName, year } = req.body;

	    try {
	      const user = await CarModels.findOne({ modelName });

	      if (user) {
	        return response(req, res, 400, false, 'The model already exists');
	      }

	      const data = new CarModels({ modelName, year });

	      try {
	        await data.save();
	        return response(req, res, 200, true, 'The new car model has been created successfully');
	      } catch (err: any) {
	        return response(req, res, 500, false, err.message);
	      }
	    } catch (err: any) {
	      return response(req, res, 500, false, err.message);
	    }
	  }
	}
}

export default CarsControllersModule;
