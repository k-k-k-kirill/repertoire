import React from "react";

// Types
import { MoveData } from "../../../types/types";

// Components
import Chessboard from "chessboardjsx";

interface ChessBoardProps {
  position: string | undefined;
  onPieceDrop: (move: MoveData) => void;
}

const ChessBoard: React.FC<ChessBoardProps> = ({ position, onPieceDrop }) => {
  return (
    <div>
      <Chessboard onDrop={onPieceDrop} position={position} />
    </div>
  );
};

export default ChessBoard;
