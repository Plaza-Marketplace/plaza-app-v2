type CommunityPage = {
  id: Id;

  name: string;

  memberCount: number;

  isMember: boolean;

  description: string;

  ongoingEvent: {
    id: Id;

    name: string;

    city: string;

    state: string;

    iconUrl: Url | null;
  } | null;

  iconUrl: string | null;

  bannerUrl: string | null;

  createdAt: Timestamp;
};
