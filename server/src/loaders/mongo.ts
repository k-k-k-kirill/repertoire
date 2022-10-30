import mongoose from "mongoose";
import config from "../config";

export default async () => {
  try {
    const isTesting = config.ENVIRONMENT === "test";
    const dbCredentials = {
      user: config.DATABASE_USER,
      password: config.DATABASE_PASSWORD,
      host: config.DATABASE_HOST,
      database: config.DATABASE_NAME,
    };

    const testingUrl = "mongodb://root:rootpassword@localhost:27017/";
    const databaseUrl = `mongodb+srv://${dbCredentials.user}:${dbCredentials.password}@${dbCredentials.host}/${dbCredentials.database}?retryWrites=true&w=majority`;

    await mongoose.connect(isTesting ? testingUrl : databaseUrl);

    console.log("Successfully connected to database!");
  } catch (error) {
    console.log(error);
  }
};
