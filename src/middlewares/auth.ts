// ========== Auth Middleware
// import all modules
import { Request as ExpressRequest, Response as ExpressResponse, NextFunction } from 'express';
import { check, validationResult } from 'express-validator';
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
