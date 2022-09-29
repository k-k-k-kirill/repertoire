import userRouter from "./user";
import authRouter from "./auth";
import branchRouter from "./branch";
import express, { Router } from "express";

const rootRouter: Router = express.Router();

rootRouter.use("/user", userRouter);
rootRouter.use("/auth", authRouter);
rootRouter.use("/branch", branchRouter);

export default rootRouter;
