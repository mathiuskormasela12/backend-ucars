// ========== Auth Routes
// import all modules
import { Router as ExpressRouter } from 'express';
import RouterModule from './Router';

// import all controllers
import authControlerModule from '../controllers/Auth';

namespace AuthRoutesModul {
	export class AuthRoutes extends RouterModule.Router {
	  constructor() {
	    super();
	    this.routes();
	  }

	  public routes(): void {
	    this.expressRouter.get('/register', authControlerModule.AuthControllers.register);
	  }

	  public get authRoutes(): ExpressRouter {
	    return this.expressRouter;
	  }
	}
}

export default new AuthRoutesModul.AuthRoutes();
