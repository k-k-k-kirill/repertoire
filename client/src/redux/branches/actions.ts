import { Branch } from "../../types/types";

export enum UiAction {
  FetchOpenings = "branches/uiFetchOpenings",
  AddBranch = "branches/uiAddBranch",
  ModifyBranch = "branches/uiModifyBranch",
  SetCurrent = "branches/uiSetCurrentBranch",
  FetchByParentId = "branches/uiFetchByParentId",
}

export enum SagaAction {
  FetchOpenings = "branches/sagaFetchOpenings",
  FetchOpeningsComplete = "branches/sagaFetchOpeningsComplete",
  FetchByParentIdComplete = "branches/sagaFetchByParentIdComplete",
  FetchBranches = "branches/sagaFetchBranches",
  FetchBranchesComplete = "branches/sagaFetchBranchesComplete",
  AddBranchComplete = "branches/sagaAddBranchComplete",
  FetchById = "branches/sagaFetchById",
  FetchByIdComplete = "branches/sagaFetchByIdComplete",
}

// Ui actions
export interface UiFetchOpeningsAction {
  type: UiAction.FetchOpenings;
}

export interface UiAddBranchAction {
  type: UiAction.AddBranch;
  payload: Branch;
}

export interface UiModifyBranchAction {
  type: UiAction.ModifyBranch;
  payload: Branch;
}

export interface UiSetCurrentBranchAction {
  type: UiAction.SetCurrent;
  payload: string;
}

export interface UiFetchByParentIdAction {
  type: UiAction.FetchByParentId;
  payload: {
    parentId: string;
  };
}

// Saga actions
export interface SagaFetchOpeningsAction {
  type: SagaAction.FetchOpenings;
}

export interface SagaFetchOpeingsActionComplete {
  type: SagaAction.FetchOpeningsComplete;
  payload: {
    openings: Branch[];
  };
}

export interface SagaFetchByParentIdComplete {
  type: SagaAction.FetchByParentIdComplete;
  payload: {
    branches: Branch[];
  };
}

export interface SagaFetchBranchesAction {
  type: SagaAction.FetchBranches;
  payload: {
    branches: Branch[];
  };
}

export interface SagaFetchBranchesCompleteAction {
  type: SagaAction.FetchBranchesComplete;
  payload: {
    branches: Branch[];
  };
}

export interface SagaAddBranchCompleteAction {
  type: SagaAction.AddBranchComplete;
  payload: Branch;
}

export interface SagaFetchByIdAction {
  type: SagaAction.FetchById;
  payload: string;
}

export interface SagaFetchByIdCompleteAction {
  type: SagaAction.FetchByIdComplete;
  payload: Branch;
}