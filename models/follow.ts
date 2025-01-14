type Follow = {
  id: Id;
  sourceId: Id;
  destId: Id;
  createdAt: string;
}

type CreateFollow = {
  sourceId: Id;
  destId: Id;
}