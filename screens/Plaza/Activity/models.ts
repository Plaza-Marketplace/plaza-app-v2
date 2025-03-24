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
    };

    community: {
      id: Id;

      name: string;

      memberCount: number;
    };

    product: {
      id: Id;

      name: string;

      imageUrl: Url;

      seller: {
        id: Id;

        username: string;
      };
    } | null;
  }[];
};
