// ========== Auth Controllers
// import all modules
import { Request as ExpressRequest, Response as ExpressResponse } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { generateToken, response } from '../helpers';
import UsersModel from '../models/users';
import { appConfig } from '../config';

namespace AuthControllersModule {
	export class AuthControllers {
	  public static async register(
	    req: ExpressRequest,
	    res: ExpressResponse,
	  ): Promise<ExpressResponse> {
	    const { username, password } = req.body;

	    try {
	      const user = await UsersModel.findOne({ username });

	      if (user) {
	        return response(req, res, 400, false, 'The username already in used');
	      }

	      const data = new UsersModel({ username, password: await bcrypt.hash(password, 8) });

	      try {
	        await data.save();
	        return response(req, res, 200, true, 'The user has been created successfully');
	      } catch (err: any) {
	        return response(req, res, 500, false, err.message);
	      }
	    } catch (err: any) {
	      return response(req, res, 500, false, err.message);
	    }
	  }

	  public static async login(
	    req: ExpressRequest,
	    res: ExpressResponse,
	  ): Promise<ExpressResponse> {
	    const { username, password } = req.body;

	    try {
	      const user = await UsersModel.findOne({ username });

	      if (!user || !(await bcrypt.compare(password, user.password))) {
	        return response(req, res, 400, false, 'The username or password is wrong');
	      }

	      const accessToken: string = generateToken(
	        {
	        	id: user.id,
	        },
	      appConfig.jwtAcessTokenSecretKey,
	      appConfig.jwtAccessTokenExpiresIn,
	      );
	      const refreshToken: string = generateToken(
	        {
	        id: user.id,
	        },
	      appConfig.jwtRefreshTokenSecretKey,
	      appConfig.jwtRefreshTokenExpiresIn,
	      );

	      return response(req, res, 200, true, 'Login successfully', { accessToken, refreshToken });
	    } catch (err: any) {
	      return response(req, res, 500, false, err.message);
	    }
	  }

	  public static async generateAccessToken(
	    req: ExpressRequest,
	    res: ExpressResponse,
	  ): Promise<ExpressResponse> {
	    const { refreshToken } = req.body;

	    try {
	      const decode: any = await jwt.verify(refreshToken, appConfig.jwtRefreshTokenSecretKey);

	      const newAccessToken: string = generateToken(
	        {
	        	id: decode.id,
	        },
	      appConfig.jwtAcessTokenSecretKey,
	      appConfig.jwtAccessTokenExpiresIn,
	      );
	      const newRefreshToken: string = generateToken(
	        {
	        id: decode.id,
	        },
	      appConfig.jwtRefreshTokenSecretKey,
	      appConfig.jwtRefreshTokenExpiresIn,
	      );

	      return response(req, res, 200, true, 'Access token has been created successfully', { accessToken: newAccessToken, refreshToken: newRefreshToken });
	    } catch (err: any) {
	      return response(req, res, 400, false, err.message);
	    }
	  }
	}
}

export default AuthControllersModule;
