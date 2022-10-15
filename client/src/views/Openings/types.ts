import { Location } from "react-router-dom";

export interface OpeningsLocationState extends Location {
  refetch: boolean;
}
