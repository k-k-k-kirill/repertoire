import { unionBy } from "lodash";
import organizeById from "./organizeById";

export default <Type extends { _id?: string }>(state: any, data: Type[]) => {
  const list: Type[] = unionBy(data, [...state.list], "_id");
  let byId: Record<string, Type> = organizeById(list);

  return { list, byId };
};
