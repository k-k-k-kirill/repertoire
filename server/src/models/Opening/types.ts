import { Document } from "mongoose";
import Branch, { Piece } from "../Branch/types";

export default interface Opening extends Document {
  title: string;
  branches: Branch[];
  moves: Move[];
}

export interface Move {
  piece: Piece;
  fromPosition: string;
  toPosition: string;
}
