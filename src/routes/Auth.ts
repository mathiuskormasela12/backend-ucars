// ========== Auth Routes
// import all modules
import { Router as ExpressRouter } from 'express';
import RouterModule from './Router';

// import all controllers
import authControlerModule from '../controllers/Auth';

// import all middlewares
import { registerAndLoginMiddleware, checkGenerateAccessTokenForm } from '../middlewares/auth';

namespace AuthRoutesModul {
	export class AuthRoutes extends RouterModule.Router {
	  constructor() {
	    super();
	    this.routes();
	  }

	  public routes(): void {
	    this.expressRouter.post('/register', registerAndLoginMiddleware, authControlerModule.AuthControllers.register);
	    this.expressRouter.post('/login', registerAndLoginMiddleware, authControlerModule.AuthControllers.login);
	    this.expressRouter.post('/access-token', checkGenerateAccessTokenForm, authControlerModule.AuthControllers.generateAccessToken);
	  }

	  public get authRoutes(): ExpressRouter {
	    return this.expressRouter;
	  }
	}
}

export default new AuthRoutesModul.AuthRoutes();
