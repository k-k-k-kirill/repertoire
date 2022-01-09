import mongoose, { Schema } from "mongoose";
import User from "./types";
import { OpeningSchema } from "../Opening/Opening";

const UserSchema: Schema = new Schema(
  {
    username: {
      type: String,
      required: false,
      nullable: true,
    },
    email: {
      type: String,
      required: true,
    },
    active: {
      type: Boolean,
      default: false,
    },
    password: {
      type: String,
      required: true,
    },
    avatar: {
      type: String,
      required: false,
    },
    openings: {
      type: [OpeningSchema],
      required: false,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<User>("User", UserSchema);
