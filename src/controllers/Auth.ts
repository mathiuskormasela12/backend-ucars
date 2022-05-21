// ========== Auth Controllers
// import all modules
import { Request as ExpressRequest, Response as ExpressResponse } from 'express';
import { response } from '../helpers';

namespace AuthControllersModule {
	export class AuthControllers {
	  public static register(req: ExpressRequest, res: ExpressResponse) {
	    return response(req, res, 200, true, 'Success', [{ username: 'mathius' }], 20, 100);
	  }
	}
}

export default AuthControllersModule;
