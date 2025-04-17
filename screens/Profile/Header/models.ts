export type Header = {
  username: string;

  description: string | null;

  profileImageUrl: string | null;

  averageRating: number;

  salesCount: number;

  followerCount: number;

  followingCount: number;

  isFollowing: boolean;

  dmConversationId: Id | null;
};
