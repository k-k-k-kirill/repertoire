import mongoose from "mongoose";
import config from "../config";

export default async () => {
  try {
    const databaseUrl = `mongodb+srv://${config.DATABASE_USER}:${config.DATABASE_PASSWORD}@${config.DATABASE_HOST}/${config.DATABASE_NAME}?retryWrites=true&w=majority`;
    await mongoose.connect(databaseUrl);

    console.log("Successfully connected to database!");
  } catch (error) {
    console.log(error);
  }
};
