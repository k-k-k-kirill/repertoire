export enum UiAction {
  SetNotification = "notification/uiSetNotification",
}

export enum SagaAction {
  SetNotification = "notification/sagaSetNotification",
}

export interface UiSetNotificationAction {
  type: UiAction.SetNotification;
  payload: string;
}

export interface SagaSetNotificationAction {
  type: UiAction.SetNotification;
  payload: string;
}
