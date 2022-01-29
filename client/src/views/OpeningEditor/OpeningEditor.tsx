import React, { useState, useEffect } from "react";
import { ChessInstance } from "chess.js";
import axios from "../../axios";
import { useNavigate } from "react-router-dom";

// Styles
import "./OpeningEditor.scss";

// Types
import { MoveData } from "../../types/types";

// Components
import EditableTitle from "../../components/EditableTitle/EditableTitle";
import ChessBoard from "../../components/Chess/ChessBoard/ChessBoard";
import Dashboard from "../../components/Layouts/Dashboard/Dashboard";
import History from "../../components/History/History";
import { Card, Button } from "antd";

const Chess = require("chess.js");

const Opening: React.FC = () => {
  const [title, setTitle] = useState("New opening");
  const [history, setHistory] = useState<string[]>([]);
  const [chess, setChess] = useState<ChessInstance | null>(null);
  const [position, setPosition] = useState<string | undefined>("start");

  const navigate = useNavigate();

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

  const onSave = async () => {
    try {
      await axios.post("/opening/add", {
        title,
        mainLine: history,
        endPosition: chess?.fen(),
      });

      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Dashboard>
      <Card className="opening-editor__header">
        <div className="opening-editor__header__content">
          <EditableTitle
            title={title}
            onChange={(e) => setTitle((e.target as HTMLInputElement).value)}
          />
          <Button onClick={onSave} size="large" type="primary">
            Save
          </Button>
        </div>
      </Card>

      <div className="opening-editor__main">
        <ChessBoard onPieceDrop={onPieceDrop} position={position} />
        <History title="Main line" history={history} onUndo={onUndo} />
      </div>
    </Dashboard>
  );
};

export default Opening;
