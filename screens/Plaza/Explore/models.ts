export type ExploreGroup = {
  id: number;

  name: string;

  description: string;

  member_count: number;

  is_member: boolean;
};

export type ExploreTab = {
  mostPopularGroups: {
    id: Id;

    name: string;

    description: string;

    bannerUrl: Url | null;
  }[];

  featuredGroups: {
    id: Id;

    name: string;

    description: string;

    isMember: boolean;
  }[];
};
