import express, { Router, Request, Response } from "express";
import { body, param, check } from "express-validator";
import validateRequest from "../helpers/validateRequest";
import branchService from "../services/Branch";
import requireAuth from "../middlewares/requireAuth";
import { ModifyActions } from "../types/types";

const branch: Router = express.Router();

branch.post(
  "/add",
  requireAuth,
  body("title").isString().withMessage("Missing opening title"),
  body("parent").isString().optional({ nullable: true }),
  body("mainLine").isArray().optional({ nullable: true }),
  body("startPosition").isString().optional({ nullable: true }),
  body("endPosition").isString().optional({ nullable: true }),
  async (req: any, res: Response) => {
    validateRequest(req);

    const newBranch = await branchService.addNew(req.body, req.user.id);

    res.status(200).send(newBranch);
  }
);

branch.post(
  "/modify",
  requireAuth,
  body("_id").isString().withMessage("Missing opening ID"),
  body("title").isString().withMessage("Missing opening title"),
  body("mainLine").isArray().optional({ nullable: true }),
  body("startPosition").isString().optional({ nullable: true }),
  body("endPosition").isString().optional({ nullable: true }),
  body("comments").isArray().optional({ nullable: true }),
  check("comments.*.position").isString().not().isEmpty(),
  check("comments.*.comment").isString(),
  body("actionType")
    .isString()
    .isIn([
      ModifyActions.UndoMove,
      ModifyActions.AddMove,
      ModifyActions.RenameBranch,
      ModifyActions.EditComments,
    ]),
  async (req: Request, res: Response) => {
    validateRequest(req);

    const newBranch = await branchService.modify(req.body);

    res.status(200).send(newBranch);
  }
);

branch.get("/openings", requireAuth, async (req: any, res: Response) => {
  const openings = await branchService.getOpenings(req.user.id);

  res.status(200).send(openings);
});

branch.get(
  "/:parentId",
  param("parentId")
    .exists()
    .isString()
    .withMessage("Valid parent id must be provided"),
  requireAuth,
  async (req: any, res: Response) => {
    validateRequest(req);

    const branches = await branchService.getByParentId(req.params.parentId);

    res.status(200).send(branches);
  }
);

branch.get(
  "/all/:id",
  param("id")
    .exists()
    .isString()
    .withMessage("Valid branch id must be provided"),
  requireAuth,
  async (req: any, res: Response) => {
    validateRequest(req);

    const branches = await branchService.getById(req.params.id);

    res.status(200).send(branches);
  }
);

branch.get("/all", requireAuth, async (req: any, res: Response) => {
  validateRequest(req);

  const branches = await branchService.getAll();

  res.status(200).send(branches);
});

branch.delete(
  "/:id",
  param("id")
    .exists()
    .isString()
    .withMessage("Valid branch id must be provided"),
  requireAuth,
  async (req: any, res: Response) => {
    validateRequest(req);

    await branchService.delete(req.params.id);

    res.status(204).send();
  }
);

export default branch;
