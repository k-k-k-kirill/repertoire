import { Square, ShortMove } from "chess.js";

export interface MoveData {
  sourceSquare: Square;
  targetSquare: Square;
  piece: string | ShortMove;
}
