export type ReviewsTab = {
  reviewsCount: number;

  reviews: {
    id: Id;

    rating: number;

    description: string;

    reviewer: {
      id: Id;

      username: string;

      profilePictureUrl: Url | null;
    };
  }[];
};
