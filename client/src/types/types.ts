import { Square, ShortMove } from "chess.js";

export interface MoveData {
  sourceSquare: Square;
  targetSquare: Square;
  piece: string | ShortMove;
}

export interface Branch {
  _id?: string;
  title: string;
  mainLine?: string[];
  startPosition?: string;
  endPosition?: string;
  parent?: string | null;
  owner?: string | null;
  comments?: PositionComment[];
}

export interface PositionComment {
  position: string;
  comment: string;
}

export interface Breadcrumb {
  _id: string;
  label: string;
}

export enum ModifyActions {
  UndoMove = "undoMove",
  AddMove = "addMove",
  RenameBranch = "renameBranch",
  EditComments = "editComments",
}
