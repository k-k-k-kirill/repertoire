import { Document } from "mongoose";
import Move from "../Opening/types";

export default interface Branch extends Document {
  opening: string;
  startingPosition: PiecePosition[];
  moves: Move[];
}

export interface PiecePosition extends Piece {
  position: string;
}

export interface Piece {
  name: string;
  color: string;
}
