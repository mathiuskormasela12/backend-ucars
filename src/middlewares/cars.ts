// ========== Cars Middleware
// import all modules
import { Request as ExpressRequest, Response as ExpressResponse, NextFunction } from 'express';
import { check, validationResult } from 'express-validator';
import { response } from '../helpers';

export const checkAddCarModelForm = [
  check('modelName', "The model name can't be empty").notEmpty(),
  check('modelName', 'The model name must be a string').isString(),
  check('year', "The year field can't be empty").notEmpty(),
  check('year', 'The year field must be a number').isInt(),

  (req: ExpressRequest, res: ExpressResponse, next: NextFunction) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return response(req, res, 400, false, errors.array()[0].msg);
    }

    return next();
  },
];
