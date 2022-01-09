import mongoose, { Schema } from "mongoose";
import Opening from "./types";

export const OpeningSchema: Schema = new Schema(
  {},
  {
    timestamps: true,
  }
);

export default mongoose.model<Opening>("Opening", OpeningSchema);
