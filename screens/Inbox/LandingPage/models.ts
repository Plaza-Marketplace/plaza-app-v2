export type LandingPage = {
  messages: {
    id: Id;

    imageUrl: Url | null;

    name: string;

    latestMessage: string;
  }[];
};
