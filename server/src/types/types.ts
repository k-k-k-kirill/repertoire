export interface BranchData {
  _id?: string;
  title: string;
  mainLine?: string[];
  endPosition: string;
  branches: string[];
  parent: null | string;
  owner: null | string;
}
