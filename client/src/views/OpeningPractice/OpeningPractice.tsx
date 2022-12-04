import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, Location } from "react-router-dom";
import _ from "lodash";
import { Typography } from "antd";
import Dashboard from "../../components/Layouts/Dashboard/Dashboard";
import ModeSwitch from "../../components/ModeSwitch/ModeSwitch";
import { PracticeLocationState } from "./types";
import {
  uiSetCurrentBranch,
  uiFetchByParentId,
  getCurrentBranch,
  getChildrenForCurrentBranch,
} from "../../redux/branches/slice";
import "./OpeningPractice.scss";
import ChessBoard from "../../components/Chess/ChessBoard/ChessBoard";
import { ChessInstance } from "chess.js";
import { Branch, MoveData, PositionComment } from "../../types/types";
import { Breadcrumb } from "../../types/types";
import { getUpdatedBreadcrumbs } from "../../utils/getUpdatedBreadCrumbs";
import Breadcrumbs from "../../components/Breadcrumbs/Breadcrumbs";
import { uiSetNotification } from "../../redux/notification/slice";
import CommentBox from "../../components/CommentBox/CommentBox";
import NonInteractiveHistory from "../../components/History/NonInteractiveHistory";

const Chess = require("chess.js");

const { Title } = Typography;

const OpeningPractice: React.FC = () => {
  const dispatch = useDispatch();
  const currentBranch = useSelector((state) => getCurrentBranch(state));
  const childrenOfCurrentBranch = useSelector((state) =>
    getChildrenForCurrentBranch(state)
  );

  const location: Location = useLocation();
  const locationState: PracticeLocationState =
    location.state as PracticeLocationState;

  const [chess] = useState<ChessInstance>(new Chess());
  const [position, setPosition] = useState<string | undefined>("start");
  const [boardEnabled, setBoardEnabled] = useState<boolean>(true);
  const [breadcrumbs, setBreadcrumbs] = useState<Breadcrumb[]>([]);
  const [positionComment, setPositionComment] = useState<string>("");
  const [history, setHistory] = useState<string[]>([]);

  const moveCounter = useRef(0);

  const [selectedBranchId, setSelectedBranchId] = useState<string | null>(
    locationState ? locationState.branchId : null
  );

  useEffect(() => {
    if (selectedBranchId) {
      dispatch(uiSetCurrentBranch(selectedBranchId));
      dispatch(uiFetchByParentId({ parentId: selectedBranchId }));
    }
  }, [selectedBranchId]);

  useEffect(() => {
    const updatedBreadcrumbs = getUpdatedBreadcrumbs(
      selectedBranchId === currentBranch._id ? [] : breadcrumbs,
      currentBranch
    );

    setBreadcrumbs(updatedBreadcrumbs);
  }, [currentBranch?._id]);

  useEffect(() => {
    if (currentBranch) {
      const currentPositionComment = currentBranch.comments?.find(
        (comment: PositionComment) => comment.position === position
      )?.comment;

      setPositionComment(currentPositionComment ?? "");
    }
  }, [position]);

  const isMoveCorrect = (move: MoveData) => {
    makeSilentMove(move);
    const history = chess?.history();
    chess?.undo();

    const moveCorrect = containsAll(currentBranch?.mainLine, history);

    return moveCorrect;
  };

  const containsAll = (haystack: string[], needle: string[]) =>
    needle.every((element, index) => {
      return haystack[index] === element;
    });

  const isMoveValid = (move: MoveData) => {
    const moveValid = !!makeSilentMove(move);
    chess?.undo();
    return moveValid;
  };

  const filterChildBranchesByStartingMove = (move: MoveData) => {
    makeSilentMove(move);
    const startingPosition = chess?.fen();
    chess?.undo();

    const nextBranchCandidates = childrenOfCurrentBranch.filter(
      (branch: Branch) => {
        return branch.startPosition === startingPosition;
      }
    );

    return nextBranchCandidates;
  };

  const makeSilentMove = (move: MoveData) =>
    chess?.move(`${move.piece}${move.sourceSquare}${move.targetSquare}`, {
      sloppy: true,
    });

  const makeMoveOnBoard = (move: MoveData) => {
    makeSilentMove(move);
    updateBoard();
  };

  const makeMoveAsOpponent = (move: string) => {
    chess?.move(move);
    updateBoard();
  };

  const pickNextBranch = (nextBranchCandidates: Branch[]): Branch => {
    const nextBranchIndex =
      nextBranchCandidates.length === 1
        ? 0
        : randomRange(0, nextBranchCandidates.length - 1);

    return nextBranchCandidates[nextBranchIndex];
  };

  const randomRange = (myMin: number, myMax: number): number => {
    return Math.floor(Math.random() * (myMax - myMin + 1) + myMin);
  };

  const onPieceDrop = (move: MoveData) => {
    const isLastMoveInMainLine =
      moveCounter.current === currentBranch?.mainLine.length - 1;
    const moveValid = isMoveValid(move);
    const moveCorrect = isMoveCorrect(move);

    if (moveValid && moveCorrect) {
      if (isLastMoveInMainLine) {
        const nextBranchCandidates = filterChildBranchesByStartingMove(move);

        if (nextBranchCandidates.length > 0) {
          const nextBranch = pickNextBranch(nextBranchCandidates);

          if (nextBranch._id) {
            dispatch(uiSetCurrentBranch(nextBranch._id));
          }

          makeMoveOnBoard(move);

          if (nextBranch && nextBranch.mainLine) {
            makeMoveAsOpponent(nextBranch.mainLine[moveCounter.current]);
          }
        } else {
          makeMoveOnBoard(move);
          setBoardEnabled(false);
          dispatch(uiSetNotification("Practice completed!"));
        }
      } else {
        makeMoveOnBoard(move);
        makeMoveAsOpponent(currentBranch?.mainLine[moveCounter.current]);
      }
    } else {
      dispatch(uiSetNotification("Wrong move!"));
    }
  };

  const updateBoard = () => {
    moveCounter.current++;
    setPosition(chess?.fen());
    setHistory(chess?.history() || []);
  };

  return (
    <Dashboard>
      <ModeSwitch openingId={selectedBranchId ?? ""} />
      <Title className="opening-practice__title" level={4}>
        {currentBranch?.title}
      </Title>

      <Breadcrumbs
        clickable={false}
        items={breadcrumbs}
        currentBranchTitle={currentBranch?.title}
      />
      <div className="opening-editor__main">
        <ChessBoard
          allowDrag={() => {
            return boardEnabled;
          }}
          onPieceDrop={onPieceDrop}
          position={position}
        />
        <NonInteractiveHistory title="Main line" history={history} />
        {positionComment !== "" ? (
          <CommentBox comment={positionComment} />
        ) : null}
      </div>
    </Dashboard>
  );
};

export default OpeningPractice;
