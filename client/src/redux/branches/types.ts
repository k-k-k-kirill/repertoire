import { Branch } from "../../types/types";

export interface BranchState {
  current?: string | null;
  byId: Record<string, Branch>;
  list: Branch[];
}
