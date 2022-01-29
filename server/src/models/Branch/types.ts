import { Document } from "mongoose";
import Move from "../Opening/types";

export default interface Branch extends Document {
  opening: string;
  startingPosition: string;
  moves: Move[];
}

export interface Piece {
  name: string;
  color: string;
}
