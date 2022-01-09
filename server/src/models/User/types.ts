import { Document } from "mongoose";
import Opening from "../Opening/types";

export default interface User extends Document {
  username: string;
  email: string;
  active: boolean;
  password: string;
  avatar: string;
  openings: Opening[];
}
