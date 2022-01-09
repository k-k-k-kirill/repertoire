import express, { Router, Request, Response } from "express";
import { cookie, body } from "express-validator";
import validateRequest from "../helpers/validateRequest";
import JWT from "../services/JWT";

const auth: Router = express.Router();

auth.get(
  "/refresh",
  cookie("Context").isString(),
  body("accessToken").isString(),
  body("refreshToken").isString(),
  async (req: Request, res: Response) => {
    validateRequest(req);

    const jwtService = new JWT(req.cookies.Context);
    const tokens = await jwtService.refreshToken(
      req.body.accessToken,
      req.body.refreshToken
    );

    res.status(200).send({ ...tokens });
  }
);

export default auth;
