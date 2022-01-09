import cors from "cors";
import morgan from "morgan";
import express, { Application } from "express";
import router from "../api/index";
import errorHandler from "../middlewares/errorHandler";
import NotFoundError from "../errors/NotFoundError";
import cookieParser from "cookie-parser";

export default (app: Application) => {
  app.use(express.json());
  app.enable("trust proxy");
  app.use(cors());
  app.use(morgan("dev"));
  app.use(cookieParser());
  app.use("/", router);

  app.all("*", () => {
    throw new NotFoundError();
  });

  app.use(errorHandler);

  return app;
};
