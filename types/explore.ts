type ExploreTab = {
  videos: {
    id: Id;
    poster: Pick<User, 'id' | 'username' | 'profileImageUrl'>;
    videoUrl: Url;
    products: Product[];
    isLiked: boolean;
    likeCount: number;
    commentCount: number;
    reviewCount: number;
    description: string | null;
    createdAt: Timestamp;
  }[];
};
