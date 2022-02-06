import express, { Router, Request, Response } from "express";
import { body } from "express-validator";
import validateRequest from "../helpers/validateRequest";
import openingService from "../services/Opening";
import requireAuth from "../middlewares/requireAuth";

const opening: Router = express.Router();

opening.post(
  "/add",
  requireAuth,
  body("title").isString(),
  async (req: Request, res: Response) => {
    validateRequest(req);

    const newOpening = await openingService.addNew(req.body);

    res.status(200).send(newOpening);
  }
);

opening.get("/all", requireAuth, async (req: Request, res: Response) => {
  const openings = await openingService.getAll();

  res.status(200).send(openings);
});

export default opening;
