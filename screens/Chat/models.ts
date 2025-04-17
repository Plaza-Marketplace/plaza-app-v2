export type ChatScreen = {
  id: Id | null;

  imageUrl: Url | null;

  name: string;

  messages: {
    id: Id;

    senderId: Id;

    profileImageUrl: Url | null;

    content: string;

    createdAt: Timestamp;
  }[];

  members: {
    id: Id;

    username: string;

    profileImageUrl: Url | null;
  }[];
};
