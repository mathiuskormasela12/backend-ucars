// ========== Cars Middleware
// import all modules
import { Request as ExpressRequest, Response as ExpressResponse, NextFunction } from 'express';
import {
  check, query, param, validationResult,
} from 'express-validator';
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

export const checkGetAllCarModelsQueries = [
  query('page').default(1),
  query('page', 'The page must be an integer').isInt(),
  query('limit').default(5),
  query('limit', 'The limit must be an integer').isInt(),

  (req: ExpressRequest, res: ExpressResponse, next: NextFunction) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return response(req, res, 400, false, errors.array()[0].msg);
    }

    return next();
  },
];

export const checkUpdateCarModelForm = [
  param('id', 'The id must be a string').isString(),
  param('id', 'The id is invalid').isMongoId(),
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

export const checkDeleteCarModelForm = [
  param('id', 'The id must be a string').isString(),
  param('id', 'The id is invalid').isMongoId(),

  (req: ExpressRequest, res: ExpressResponse, next: NextFunction) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return response(req, res, 400, false, errors.array()[0].msg);
    }

    return next();
  },
];
