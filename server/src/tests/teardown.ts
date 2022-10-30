import Seeder from "../services/Seeder";
import mongoose from "mongoose";

export default async () => {
  await mongoose.connection.close();
};
