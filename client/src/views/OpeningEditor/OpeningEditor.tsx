import React, { useState, useEffect, useRef } from "react";
import { connect } from "react-redux";
import { ChessInstance } from "chess.js";
import "./OpeningEditor.scss";
import { MoveData } from "../../types/types";
import EditableTitle from "../../components/EditableTitle/EditableTitle";
import ChessBoard from "../../components/Chess/ChessBoard/ChessBoard";
import Dashboard from "../../components/Layouts/Dashboard/Dashboard";
import History from "../../components/History/History";
import { Card, Typography } from "antd";
import {
  uiAddBranch,
  uiModifyBranch,
  getCurrentBranch,
  uiSetCurrentBranch,
  uiFetchByParentId,
} from "../../redux/branches/slice";
import { useLocation, Location } from "react-router-dom";
import { Branch as BranchType } from "../../types/types";
import { EditorLocationState } from "./types";

const Chess = require("chess.js");

const { Title } = Typography;

interface OpeningEditorStateProps {
  currentBranch: BranchType;
}

interface OpeningEditorDispatchProps {
  uiAddBranch: typeof uiAddBranch;
  uiModifyBranch: typeof uiModifyBranch;
  uiSetCurrentBranch: typeof uiSetCurrentBranch;
  uiFetchByParentId: typeof uiFetchByParentId;
}

type OpeningEditorProps = OpeningEditorDispatchProps & OpeningEditorStateProps;

const OpeningEditor: React.FC<OpeningEditorProps> = ({
  uiAddBranch,
  uiModifyBranch,
  currentBranch,
  uiSetCurrentBranch,
  uiFetchByParentId,
}) => {
  const location: Location = useLocation();
  const locationState: EditorLocationState =
    location.state as EditorLocationState;

  const [selectedBranchId, setSelectedBranchId] = useState<string | null>(
    locationState ? locationState.branchId : null
  );
  const [shouldCreateNewOpening, setShouldCreateNewOpening] = useState<boolean>(
    locationState && locationState.new ? locationState.new : false
  );
  const [title, setTitle] = useState(
    currentBranch ? currentBranch.title : "New opening"
  );
  const [history, setHistory] = useState<string[]>(
    currentBranch && currentBranch.mainLine ? currentBranch.mainLine : []
  );
  const [chess] = useState<ChessInstance>(new Chess());
  const [position, setPosition] = useState<string | undefined>("start");

  useEffect(() => {
    if (locationState && locationState.branchId) {
      setSelectedBranchId(locationState?.branchId);
    }
  }, [locationState?.branchId]);

  useEffect(() => {
    if (shouldCreateNewOpening) {
      createNewOpening();
      setShouldCreateNewOpening(false);

      let startingPosition = "start";
      setPosition(startingPosition);
    }
  }, [shouldCreateNewOpening]);

  useEffect(() => {
    if (selectedBranchId) {
      uiSetCurrentBranch(selectedBranchId);
      uiFetchByParentId({ parentId: selectedBranchId });
      setSelectedBranchId(null);
    }
  }, [selectedBranchId]);

  useEffect(() => {
    if (currentBranch && currentBranch.endPosition) {
      let startingPosition = currentBranch.endPosition;

      if (currentBranch.title) {
        setTitle(currentBranch.title);
      }

      if (currentBranch.mainLine) {
        setHistory(currentBranch.mainLine);
        populateMoves(currentBranch.mainLine);
      }

      setPosition(startingPosition);
    }
  }, [currentBranch]);

  const populateMoves = (moves: string[]) => {
    moves.forEach((move) => chess.move(move));
  };

  const onPieceDrop = (move: MoveData) => {
    const moveValid = chess?.move(
      `${move.piece}${move.sourceSquare}${move.targetSquare}`,
      {
        sloppy: true,
      }
    );

    if (moveValid) {
      updateBoard();
      modifyCurrentBranch();
    }
  };

  const updateBoard = () => {
    setPosition(chess?.fen());
    setHistory(chess?.history() || []);
  };

  const onUndo = () => {
    chess?.undo();
    updateBoard();
    modifyCurrentBranch();
  };

  const createNewOpening = () => {
    const openingDetails: BranchType = {
      title,
      mainLine: history,
      endPosition: chess?.fen(),
      parent: null,
      owner: null,
    };

    uiAddBranch(openingDetails);
  };

  const modifyCurrentBranch = () => {
    if (currentBranch) {
      const openingDetails: BranchType = {
        _id: currentBranch._id,
        title,
        mainLine: chess?.history(),
        endPosition: chess?.fen(),
      };

      uiModifyBranch(openingDetails);
    }
  };

  return (
    <Dashboard>
      <Title level={3}>Opening editor</Title>
      <Card className="opening-editor__header">
        <div className="opening-editor__header__content">
          <EditableTitle
            title={title}
            onChange={(e) => setTitle((e.target as HTMLInputElement).value)}
            onEditingComplete={modifyCurrentBranch}
          />
        </div>
      </Card>

      <div className="opening-editor__main">
        <ChessBoard onPieceDrop={onPieceDrop} position={position} />
        <History
          chess={chess}
          title="Main line"
          history={history}
          onUndo={onUndo}
        />
      </div>
    </Dashboard>
  );
};

const mapStateToProps = (state: any) => ({
  currentBranch: getCurrentBranch(state),
});

const mapDispatchToProps = {
  uiAddBranch,
  uiModifyBranch,
  uiSetCurrentBranch,
  uiFetchByParentId,
};

export default connect(mapStateToProps, mapDispatchToProps)(OpeningEditor);