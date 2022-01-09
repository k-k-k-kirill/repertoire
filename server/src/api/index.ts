import userRouter from "./user";
import authRouter from "./auth";
import express, { Router } from "express";

const rootRouter: Router = express.Router();

rootRouter.use("/user", userRouter);
rootRouter.use("/auth", authRouter);

export default rootRouter;
