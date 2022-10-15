import { Branch } from "../../types/types";
import { ModifyActions } from "../../types/types";

export interface BranchState {
  current?: string | null;
  byId: Record<string, Branch>;
  list: Branch[];
}

export interface ModifyBranchActionPayload extends Branch {
  actionType: ModifyActions;
}
