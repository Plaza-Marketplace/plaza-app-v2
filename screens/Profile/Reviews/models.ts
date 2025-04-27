export type ReviewsTab = {
  reviewsCount: number;

  reviews: {
    id: Id;

    rating: number;

    description: string;

    reviewer: {
      id: Id;

      username: string;

      profileImageUrl: Url | null;
    };
  }[];
};
