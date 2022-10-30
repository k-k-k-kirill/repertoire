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

  const corsConfig = {
    origin: true,
    credentials: true,
  };

  app.use(cors(corsConfig));
  app.use(morgan("combined"));
  app.use(cookieParser());
  app.use("/", router);

  app.all("*", () => {
    throw new NotFoundError();
  });

  app.use(errorHandler);

  return app;
};
