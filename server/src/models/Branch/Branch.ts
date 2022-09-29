import mongoose, { Schema } from "mongoose";
import Branch from "./types";

export const BranchSchema: Schema<Branch> = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    mainLine: {
      type: [String],
      required: false,
    },
    startPosition: {
      type: String,
      required: false,
    },
    endPosition: {
      type: String,
      required: false,
    },
    //@ts-ignore
    owner: {
      type: Schema.Types.ObjectId,
      required: false,
      default: null,
      ref: "User",
      cast: (value: any) => {
        if (value === "all") {
          return null;
        }

        return new mongoose.Types.ObjectId(value);
      },
    },
    //@ts-ignore
    parent: {
      type: Schema.Types.ObjectId,
      cast: (value: any) => {
        if (value === "all") {
          return null;
        }

        return new mongoose.Types.ObjectId(value);
      },
      required: false,
      default: null,
      ref: "Branch",
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<Branch>("Branch", BranchSchema);
