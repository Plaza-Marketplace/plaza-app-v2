import { PostType } from '@/models/communityPost';

export type ActivityTab = {
  yourGroups: {
    id: Id;

    name: string;

    memberCount: number;

    iconUrl: Url | null;
  }[];

  groupPostings: {
    id: Id;

    title: string;

    description: string;

    postType: PostType;

    createdAt: Timestamp;

    poster: {
      id: Id;

      username: string;

      profilePictureUrl: Url | null;
    };

    community: {
      id: Id;

      name: string;

      iconUrl: Url | null;
    };

    product: {
      id: Id;

      name: string;

      thumbnailUrl: Url | null;

      seller: {
        id: Id;

        username: string;

        profilePictureUrl: Url | null;

        averageRating: number;
      };
    } | null;
  }[];
};
