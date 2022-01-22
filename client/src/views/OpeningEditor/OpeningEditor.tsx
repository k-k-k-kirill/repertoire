import React, { useState, useEffect } from "react";
import { ChessInstance } from "chess.js";

// Styles
import "./OpeningEditor.scss";

// Types
import { MoveData } from "../../types/types";

// Components
import EditableTitle from "../../components/EditableTitle/EditableTitle";
import ChessBoard from "../../components/Chess/ChessBoard/ChessBoard";
import Dashboard from "../../components/Layouts/Dashboard/Dashboard";
import History from "../../components/History/History";

const Chess = require("chess.js");

const Opening: React.FC = () => {
  const [title, setTitle] = useState("Editable title");
  const [history, setHistory] = useState<string[]>([]);
  const [chess, setChess] = useState<ChessInstance | null>(null);
  const [position, setPosition] = useState<string | undefined>("start");

  useEffect(() => {
    const startingPosition = "start";

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
      updateBoard();
    }
  };

  const updateBoard = () => {
    setPosition(chess?.fen());
    setHistory(chess?.history() || []);
  };

  const onUndo = () => {
    chess?.undo();
    updateBoard();
  };

  return (
    <Dashboard>
      <EditableTitle
        title={title}
        onChange={(e) => setTitle((e.target as HTMLInputElement).value)}
      />
      <div className="opening-editor__main">
        <ChessBoard onPieceDrop={onPieceDrop} position={position} />
        <History title="Main line" history={history} onUndo={onUndo} />
      </div>
    </Dashboard>
  );
};

export default Opening;
