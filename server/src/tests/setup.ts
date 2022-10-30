import Seeder from "../services/Seeder";
import mongoose from "mongoose";

export default async () => {
  const testingUrl = "mongodb://root:rootpassword@localhost:27017/";
  await mongoose.connect(testingUrl);
  await Seeder.seedDb();
};
