import React from "react";

// Types
import { MoveData } from "../../../types/types";

// Components
import Chessboard from "chessboardjsx";

interface ChessBoardProps {
  position: string | undefined;
  onPieceDrop: (move: MoveData) => void;
  allowDrag: () => boolean;
}

const ChessBoard: React.FC<ChessBoardProps> = ({
  position,
  onPieceDrop,
  allowDrag,
}) => {
  return (
    <div>
      <Chessboard
        allowDrag={allowDrag}
        onDrop={onPieceDrop}
        position={position}
      />
    </div>
  );
};

export default ChessBoard;
