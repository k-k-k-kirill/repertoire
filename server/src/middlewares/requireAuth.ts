import { Request, Response, NextFunction } from "express";
import UnauthorizedError from "../errors/UnauthorizedError";
import JWT from "../services/JWT";

export default async (req: Request, res: Response, next: NextFunction) => {
  const context = req.cookies.Context;
  const accessToken = req.headers["authorization"] as string;

  if (!context || !accessToken) {
    throw new UnauthorizedError();
  }

  const jwtService = new JWT(context);
  const accessTokenValid = await jwtService.verifyAccessToken(accessToken);

  if (accessTokenValid) {
    next();
  } else {
    throw new UnauthorizedError();
  }
};
