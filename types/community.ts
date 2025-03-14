type CommunityPage = {
  id: Id;

  name: string;

  memberCount: number;

  isMember: boolean;

  description: string;

  iconUrl: string | null;

  bannerUrl: string | null;

  createdAt: Timestamp;
};
