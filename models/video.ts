type Video = {
  id: Id;

  posterId: Id;

  videoUrl: Url;

  description: string | null;

  createdAt: Timestamp;
};

type CreateVideo = {
  posterId: Id;

  description: string | null;

  base64Video: Base64;
};
