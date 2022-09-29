import { Document } from "mongoose";

export default interface Branch extends Document {
  title: string | null;
  mainLine: string[];
  endPosition: string | null;
  owner: string | null;
  parent: string | null;
}
