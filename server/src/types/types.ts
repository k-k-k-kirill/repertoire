export interface BranchData {
  _id: string;
  title: string;
  mainLine?: string[];
  endPosition: string;
  branches: string[];
  parent: null | string;
  owner: null | string;
}

export interface BranchModificationData extends BranchData {
  actionType?: ModifyActions;
}

export enum ModifyActions {
  UndoMove = "undoMove",
  AddMove = "addMove",
  RenameBranch = "renameBranch",
  EditComments = "editComments",
}
