import { NextFunction, Request, Response } from "express";
import { validationResult } from "express-validator";

export const inputValidationMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    let newErorsArray = errors.array().map(function (a) {
      return {
        message: a.msg,
        field: a.param,
      };
    });
    res.status(400).json({ errorsMessages: newErorsArray });
  } else {
    next();
  }
};
