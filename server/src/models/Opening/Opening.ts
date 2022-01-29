import mongoose, { Schema } from "mongoose";
import Opening from "./types";

export const OpeningSchema: Schema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    mainLine: {
      type: [String],
      required: false,
    },
    endPosition: {
      type: String,
      required: false,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<Opening>("Opening", OpeningSchema);
