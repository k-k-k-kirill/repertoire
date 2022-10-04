interface LocationState {
  branchId: string;
  new?: boolean;
}

export type EditorLocationState = LocationState | null;

export interface Breadcrumb {
  _id: string;
  label: string;
}
