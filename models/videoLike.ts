type VideoLike = {
  id: Id;

  videoId: Id;

  likerId: Id;

  createdAt: Timestamp;
};

type CreateVideoLike = {
  videoId: Id;

  likerId: Id;
};

type DeleteVideoLike = {
  videoId: Id;

  likerId: Id;
};
