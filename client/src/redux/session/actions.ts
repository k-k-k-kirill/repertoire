export enum SagaAction {
  SetIsAuthenticated = "session/sagaSetIsAuthenticated",
}

export enum UiAction {
  SetIsAuthenticated = "session/uiSetIsAuthenticated",
}

export interface SagaSetIsAuthenticated {
  type: SagaAction.SetIsAuthenticated;
  payload: {
    isAuthenticated: boolean;
  };
}

export interface UiSetIsAuthenticated {
  type: UiAction.SetIsAuthenticated;
  payload: {
    isAuthenticated: boolean;
  };
}
