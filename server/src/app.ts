import "express-async-errors";
import loaders from "./loaders";
import express, { Application } from "express";
import config from "./config/index";

const startServer = async () => {
  const app: Application = express();

  await loaders({ expressApp: app });

  app.listen(config.SERVER_PORT, () => {
    console.log(`App is listening on port ${config.SERVER_PORT}`);
  });
};

startServer();
