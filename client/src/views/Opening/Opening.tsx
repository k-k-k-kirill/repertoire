import React from "react";
import ChessBoard from "../../components/Chess/ChessBoard/ChessBoard";
import Dashboard from "../../components/Layouts/Dashboard/Dashboard";
import "./Opening.scss";

const Opening: React.FC = () => {
  return (
    <Dashboard>
      <div className="opening__content">
        <ChessBoard />
      </div>
    </Dashboard>
  );
};

export default Opening;
