import userRouter from "./user";
import authRouter from "./auth";
import openingRouter from "./opening";
import express, { Router } from "express";

const rootRouter: Router = express.Router();

rootRouter.use("/user", userRouter);
rootRouter.use("/auth", authRouter);
rootRouter.use("/opening", openingRouter);

export default rootRouter;
