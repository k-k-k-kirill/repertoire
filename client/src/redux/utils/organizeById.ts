export default <Type extends { _id?: string }>(data: Type[]) => {
  let byId: Record<string, Type> = {};

  data.forEach((item: Type) => {
    if (item._id!) {
      const id = item._id;
      if (id) {
        byId[id] = item;
      }
    }
  });

  return byId;
};
