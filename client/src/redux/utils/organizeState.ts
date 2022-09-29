export default <Type extends { _id?: string }>(state: any, data: Type[]) => {
  let byId: Record<string, Type> = {};
  const list: Type[] = [...data];

  list.forEach((item: Type) => {
    if (item._id!) {
      const id = item._id;
      if (id) {
        byId[id] = item;
      }
    }
  });

  return { list, byId };
};
