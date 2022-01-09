import express, { Router, Request, Response } from "express";
import userService from "../services/User";
import { body } from "express-validator";
import validateRequest from "../helpers/validateRequest";

const user: Router = express.Router();

user.get("/", (req: Request, res: Response) => {
  res.send("User!");
});

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

user.get(
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

export default user;
