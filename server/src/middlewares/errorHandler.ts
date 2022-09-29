import { Request, Response, NextFunction } from "express";
import CustomError from "../errors/CustomError";
import config from "../config";

export default (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (config.ENVIRONMENT === "development") {
    console.log(err);
  }

  if (err instanceof CustomError) {
    return res.status(err.statusCode).send({ errors: err.serializeErrors() });
  }

  res.status(400).send({
    errors: [{ message: "Something went wrong." }],
  });
};
