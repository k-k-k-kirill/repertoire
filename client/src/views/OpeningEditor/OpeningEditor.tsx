import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { ChessInstance } from "chess.js";
import "./OpeningEditor.scss";
import { getUpdatedBreadcrumbs } from "../../utils/getUpdatedBreadCrumbs";
import { ModifyActions, MoveData } from "../../types/types";
import EditableTitle from "../../components/EditableTitle/EditableTitle";
import ChessBoard from "../../components/Chess/ChessBoard/ChessBoard";
import Dashboard from "../../components/Layouts/Dashboard/Dashboard";
import History from "../../components/History/History";
import { Card } from "antd";
import {
  uiAddBranch,
  uiModifyBranch,
  getCurrentBranch,
  uiSetCurrentBranch,
  uiFetchByParentId,
} from "../../redux/branches/slice";
import { useLocation, Location } from "react-router-dom";
import { Branch as BranchType, Breadcrumb } from "../../types/types";
import { EditorLocationState } from "./types";
import Breadcrumbs from "../../components/Breadcrumbs/Breadcrumbs";
import { ModifyBranchActionPayload } from "../../redux/branches/types";
import ModeSwitch from "../../components/ModeSwitch/ModeSwitch";

const Chess = require("chess.js");

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
  const [boardEnabled, setBoardEnabled] = useState<boolean>(true);
  const [breadcrumbs, setBreadcrumbs] = useState<Breadcrumb[]>([]);

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

      const updatedBreadcrumbs = getUpdatedBreadcrumbs(
        selectedBranchId === currentBranch._id ? [] : breadcrumbs,
        currentBranch
      );
      setBreadcrumbs(updatedBreadcrumbs);

      setPosition(startingPosition);
    }
  }, [currentBranch?._id]);

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
      modifyCurrentBranch(ModifyActions.AddMove);
    }
  };

  const updateBoard = () => {
    setPosition(chess?.fen());
    setHistory(chess?.history() || []);
  };

  const onUndo = () => {
    chess?.undo();
    updateBoard();
    modifyCurrentBranch(ModifyActions.UndoMove);
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

  const modifyCurrentBranch = (actionType: ModifyActions) => {
    if (currentBranch) {
      const modificationData: ModifyBranchActionPayload = {
        _id: currentBranch._id,
        title,
        mainLine: chess?.history(),
        endPosition: chess?.fen(),
        actionType,
      };

      uiModifyBranch(modificationData);
    }
  };

  return (
    <Dashboard>
      <ModeSwitch openingId={locationState?.branchId || ""} />

      <Card className="opening-editor__header">
        <div className="opening-editor__header__content">
          <EditableTitle
            title={title}
            onChange={(e) => {
              const newTitle = (e.target as HTMLInputElement).value;
              if (newTitle !== "") {
                setTitle(newTitle);
              }
            }}
            onEditingComplete={() =>
              modifyCurrentBranch(ModifyActions.RenameBranch)
            }
          />
        </div>
      </Card>

      <Breadcrumbs items={breadcrumbs} currentBranchTitle={title} />

      <div className="opening-editor__main">
        <ChessBoard
          allowDrag={() => {
            return boardEnabled;
          }}
          onPieceDrop={onPieceDrop}
          position={position}
        />
        <History
          currentPositionFen={position}
          title="Main line"
          history={history}
          onUndo={onUndo}
          onBoardEnabledChange={(boardEnabledState: boolean) =>
            setBoardEnabled(boardEnabledState)
          }
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
