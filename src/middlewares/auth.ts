// ========== Auth Middleware
// import all modules
import { Request as ExpressRequest, Response as ExpressResponse, NextFunction } from 'express';
import { check, validationResult } from 'express-validator';
import jwt from 'jsonwebtoken';
import { appConfig } from '../config';
import { response } from '../helpers';

export const registerAndLoginMiddleware = [
  check('username', "The username can't be empty").notEmpty(),
  check('username', 'The username must be a string').isString(),
  check('password', "The password can't be empty").notEmpty(),
  check('password', 'The password must be a string').isString(),
  check('password', 'The password is too short').isLength({ min: 6 }),
  check('password', 'The password is too weak').isStrongPassword(),

  (req: ExpressRequest, res: ExpressResponse, next: NextFunction) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return response(req, res, 400, false, errors.array()[0].msg);
    }

    return next();
  },
];

export const checkGenerateAccessTokenForm = [
  check('refreshToken', "The refresh token can't be empty").notEmpty(),
  check('refreshToken', 'The refresh must be a string').isString(),
  check('refreshToken', 'The refresh is invalid').isJWT(),

  (req: ExpressRequest, res: ExpressResponse, next: NextFunction) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return response(req, res, 400, false, errors.array()[0].msg);
    }

    return next();
  },
];

export const isLoggedIn = async (
  req: ExpressRequest,
  res: ExpressResponse,
  next: NextFunction,
): Promise<any> => {
  const { authorization } = req.headers;

  if (authorization) {
    try {
      const decode = await jwt.verify(authorization, appConfig.jwtAcessTokenSecretKey);

      req.app.locals.decode = decode;
      return next();
    } catch (err: any) {
      return response(req, res, 403, false, err.message);
    }
  } else {
    return response(req, res, 403, false, 'Forbidden');
  }
};
