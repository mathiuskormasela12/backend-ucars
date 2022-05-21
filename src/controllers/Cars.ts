// ========== Cars Controllers
// import all modules
import { Request as ExpressRequest, Response as ExpressResponse } from 'express';
import { response, upload, deletFile } from '../helpers';
import CarModels from '../models/carModels';
import Cars from '../models/cars';

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
	        const results = await data.save();
	        return response(req, res, 200, true, 'The new car model has been created successfully', results);
	      } catch (err: any) {
	        return response(req, res, 500, false, err.message);
	      }
	    } catch (err: any) {
	      return response(req, res, 500, false, err.message);
	    }
	  }

	  public static async getCarModels(
	    req: ExpressRequest,
	    res: ExpressResponse,
	  ): Promise<ExpressResponse> {
	    const { page, limit }: any = req.query;
	    const startData = Number(limit) * Number(page) - Number(limit);

	    try {
	      const carModels = await CarModels.find().skip(startData).limit(limit);
	      const totalData: number = await CarModels.find().count();
	      const totalPages: number = Math.ceil(totalData / limit);

	      if (carModels.length < 1) {
	        return response(req, res, 404, false, 'The car models is empty', []);
	      }
	      console.log(carModels);
	      return response(req, res, 200, true, 'Success to get all car models2', carModels, totalPages, totalData);
	    } catch (err: any) {
	      return response(req, res, 500, false, err.message);
	    }
	  }

	  public static async updateCarModel(
	    req: ExpressRequest,
	    res: ExpressResponse,
	  ): Promise<ExpressResponse> {
	    const { modelName, year } = req.body;
	    const { id } = req.params;

	    try {
	      const carModels = await CarModels.findById(id);

	      if (!carModels) {
	        return response(req, res, 400, false, 'The model does not exist');
	      }

	      try {
	        await CarModels.updateOne({ _id: id }, { modelName, year });
	        return response(req, res, 200, true, 'The car model has been updated successfully');
	      } catch (err: any) {
	        return response(req, res, 500, false, err.message);
	      }
	    } catch (err: any) {
	      return response(req, res, 500, false, err.message);
	    }
	  }

	  public static async deleteCarModel(
	    req: ExpressRequest,
	    res: ExpressResponse,
	  ): Promise<ExpressResponse> {
	    const { id } = req.params;

	    try {
	      const carModels = await CarModels.findById(id);

	      if (!carModels) {
	        return response(req, res, 400, false, 'The model does not exist');
	      }

	      try {
	        await CarModels.deleteOne({ _id: id });
	        return response(req, res, 200, true, 'The car model has been deleted successfully');
	      } catch (err: any) {
	        return response(req, res, 500, false, err.message);
	      }
	    } catch (err: any) {
	      return response(req, res, 500, false, err.message);
	    }
	  }

	  public static async addCarBrand(
	    req: ExpressRequest,
	    res: ExpressResponse,
	  ): Promise<ExpressResponse> {
	    const {
	      name,
	      carModelId,
	      description,
	      year,
	    } = req.body;

	    try {
	      const cars = await Cars.findOne({ carModelId });

	      if (cars) {
	        return response(req, res, 400, false, 'The brand already exists');
	      }

	      const logo: any = upload(req);

	      if (!logo.success) {
	        return response(req, res, 400, false, logo.message);
	      }

	      const data = new Cars({
	        name,
	        carModelId,
	        description,
	        year,
	        logo: logo.logo,
	      });

	      try {
	        const results = await data.save();
	        return response(req, res, 200, true, 'The new car model has been created successfully', results);
	      } catch (err: any) {
	        return response(req, res, 500, false, err.message);
	      }
	    } catch (err: any) {
	      return response(req, res, 500, false, err.message);
	    }
	  }

	  public static async updateCarBrand(
	    req: ExpressRequest,
	    res: ExpressResponse,
	  ): Promise<ExpressResponse> {
	    const {
	      name,
	      carModelId,
	      description,
	      year,
	    } = req.body;

	    const { id } = req.params;

	    try {
	      const cars = await Cars.findOne({ carModelId });

	      if (!cars) {
	        return response(req, res, 400, false, 'The brand does not exist');
	      }

	      if (req.files && req.files.logo) {
	        const logo: any = upload(req);

	      if (!logo.success) {
	        return response(req, res, 400, false, logo.message);
	      }

	      deletFile(`/uploads/${cars.logo}`);

	      try {
	        await Cars.updateOne({ id }, {
	          name,
	          carModelId,
	          description,
	          year,
	          logo: logo.logo,
	        });
	        return response(req, res, 200, true, 'The car brand has been updated successfully');
	      } catch (err: any) {
	        return response(req, res, 500, false, err.message);
	      }
	      }

	      try {
	        await Cars.updateOne({ id }, {
	          name,
	          carModelId,
	          description,
	          year,
	          logo: cars.logo,
	        });
	        return response(req, res, 200, true, 'The car brand has been updated successfully');
	      } catch (err: any) {
	        return response(req, res, 500, false, err.message);
	      }
	    } catch (err: any) {
	      return response(req, res, 500, false, err.message);
	    }
	  }

	  public static async deleteCarBrand(
	    req: ExpressRequest,
	    res: ExpressResponse,
	  ): Promise<ExpressResponse> {
	    const { id } = req.params;

	    try {
	      const cars = await Cars.findById(id);

	      if (!cars) {
	        return response(req, res, 400, false, 'The brand does not exist');
	      }

	      try {
	        const result = await Cars.deleteOne({ _id: id });

	        if (result.deletedCount > 0) deletFile(`/uploads/${cars.logo}`);
	        return response(req, res, 200, true, 'The car brand has been deleted successfully');
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
