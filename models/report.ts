type ProductReport = {
  id: number;
  productId: Id;
  reporterId: Id | null;
  reason: string | null;
  createdAt: Date;
};

type UserReport = {
  id: number;
  userId: Id;
  reporterId: Id | null;
  reason: string | null;
  createdAt: Date;
};

type VideoReport = {
  id: number;
  videoId: Id;
  reporterId: Id | null;
  reason: string | null;
  createdAt: Date;
};

type CommunityReport = {
  id: number;
  communityId: Id;
  reporterId: Id | null;
  reason: string | null;
  createdAt: Date;
};

type CreateReport = {
  reporteeId: Id;
  reporterId: Id | null;
  reason: string | null;
};
