import { PostType } from '@/models/communityPost';

export type CommunityPost = {
  id: Id;

  title: string;

  description: string;

  postType: PostType;

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
};
