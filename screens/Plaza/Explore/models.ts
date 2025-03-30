export type ExploreGroup = {
  id: number;

  name: string;

  description: string;

  member_count: number;

  is_member: boolean;
};

export type SearchGroup = {
  id: Id;

  name: string;

  iconUrl: Url | null;
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

    iconUrl: Url | null;

    isMember: boolean;
  }[];
};
