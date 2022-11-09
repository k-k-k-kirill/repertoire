import express, { Router, Request, Response } from "express";
import userService from "../services/User";
import { body, param } from "express-validator";
import validateRequest from "../helpers/validateRequest";
import requireAuth from "../middlewares/requireAuth";

const user: Router = express.Router();

user.post(
  "/signup",
  body("email").isEmail(),
  body("password")
    .isLength({ min: 10 })
    .withMessage("Password must be at least 10 chars.")
    .matches(/\d/)
    .withMessage("Password must contain a number.")
    .matches(/[A-Z]/)
    .withMessage("Password must containd at least one uppercase letter.")
    .matches(/[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/)
    .withMessage("Password must contain at least one special character."),
  async (req: Request, res: Response) => {
    validateRequest(req);

    const { username, password, email } = req.body;
    const userId = await userService.signUp(email, password, username);

    res.status(200).send(userId);
  }
);

user.post(
  "/login",
  body("email").isEmail().withMessage("Invalid e-mail."),
  body("password").exists().withMessage("You must provide password to login."),
  async (req: Request, res: Response) => {
    validateRequest(req);

    const { accessToken, refreshToken, fingerprint } = await userService.login(
      req.body.email,
      req.body.password
    );

    res.cookie("Context", fingerprint, {
      httpOnly: true,
    });

    res.status(200).send({
      accessToken,
      refreshToken,
    });
  }
);

user.delete(
  "/:id",
  param("id").exists().isString().withMessage("Valid user id must be provided"),
  requireAuth,
  async (req: any, res: Response) => {
    validateRequest(req);

    if (req.user.id !== req.params.id) res.status(403).send();

    await userService.delete(req.user.id);

    res.status(204).send();
  }
);

export default user;
