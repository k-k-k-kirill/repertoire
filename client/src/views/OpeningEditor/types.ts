interface LocationState {
  branchId: string;
  new?: boolean;
}

export type EditorLocationState = LocationState | null;
