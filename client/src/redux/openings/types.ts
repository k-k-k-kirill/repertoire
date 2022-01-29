import { Opening } from "../../types/types";

export interface OpeningsState {
  current?: string | null;
  byId: Record<string, Opening>;
  list: Opening[];
}
