import React, { useEffect, useState } from "react";
import Chessboard from "chessboardjsx";
import { ChessInstance, Square, ShortMove } from "chess.js";

const Chess = require("chess.js");

interface MoveData {
  sourceSquare: Square;
  targetSquare: Square;
  piece: string | ShortMove;
}

const ChessBoard: React.FC = () => {
  const [chess, setChess] = useState<ChessInstance | null>(null);
  const [position, setPosition] = useState<string | undefined>("start");

  useEffect(() => {
    const startingPosition =
      "rnb1kbnr/pppp1ppp/8/4p3/5PPq/8/PPPPP2P/RNBQKBNR w KQkq - 1 3";

    const chess: ChessInstance = new Chess();
    chess.load(startingPosition);

    setChess(chess);
    setPosition(startingPosition);
  }, []);

  const onPieceDrop = (move: MoveData) => {
    const moveValid = chess?.move(
      `${move.piece}${move.sourceSquare}${move.targetSquare}`,
      {
        sloppy: true,
      }
    );

    if (moveValid) {
      setPosition(chess?.fen());
    }
  };

  return (
    <div>
      <Chessboard onDrop={onPieceDrop} position={position} />
    </div>
  );
};

export default ChessBoard;
