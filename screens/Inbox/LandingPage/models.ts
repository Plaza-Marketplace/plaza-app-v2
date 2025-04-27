export type LandingPage = {
  messages: {
    id: Id;

    imageUrl: Url | null;

    name: string;

    userId: Id;

    latestMessage: string;
  }[];
};
