import { Opening } from "../../types/types";

export enum UiAction {
  FetchOpenings = "openings/uiFetchOpenings",
}

export enum SagaAction {
  FetchOpenings = "openings/sagaFetchOpenings",
  FetchOpeningsComplete = "openings/sagaFetchOpeningsComplete",
}

export interface UiFetchOpeningsAction {
  type: UiAction.FetchOpenings;
}

export interface SagaFetchOpeningsAction {
  type: SagaAction.FetchOpenings;
}

export interface SagaFetchOpeingsActionComplete {
  type: SagaAction.FetchOpeningsComplete;
  payload: {
    openings: Opening[];
  };
}
