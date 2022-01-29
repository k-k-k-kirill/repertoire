import { Square, ShortMove } from "chess.js";

export interface MoveData {
  sourceSquare: Square;
  targetSquare: Square;
  piece: string | ShortMove;
}

export interface Opening {
  _id: string;
  title: string;
  mainLine?: string[];
  endPosition?: string;
}
