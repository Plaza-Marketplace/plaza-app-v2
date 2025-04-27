type ReportCommunityPost = {
  id: Id;
  communityPostId: Id;
  reporterId: Id | null;
  reason: string | null;
  createdAt: Date;
  communityId: Id;
};

type ReportCommunityCollection = {
  id: Id;
  communityCollectionId: Id;
  reporterId: Id | null;
  reason: string | null;
  createdAt: Date;
  communityId: Id;
};

type ReportCommunityMember = {
  id: Id;
  communityMemberId: Id;
  reporterId: Id | null;
  reason: string | null;
  createdAt: Date;
  communityId: Id;
};

type CreateCommunityReport = {
  reporteeId: Id;
  reporterId: Id | null;
  reason: string | null;
  communityId: number;
};
