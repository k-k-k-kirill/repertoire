import "express-async-errors";
import mongoLoader from "./loaders/mongo";
import { Application } from "express";
import config from "./config/index";
import app from "./app";

const startServer = async (app: Application) => {
  await mongoLoader();

  app.listen(config.SERVER_PORT, () => {
    console.log(`App is listening on port ${config.SERVER_PORT}`);
  });
};

startServer(app);
