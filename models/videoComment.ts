type VideoComment = {
  id: Id;

  videoId: Id;

  poster: User;

  description: string;

  createdAt: Timestamp;
};

type CreateVideoComment = {
  videoId: Id;

  posterId: Id;

  description: string;
};
