type CommunityMember = {
  id: Id;

  userId: Id;

  communityId: Id;

  createdAt: Timestamp;

  role: CommunityMemberRole;
};

type CreateCommunityMember = {
  userId: Id;

  communityId: Id;
};

type DeleteCommunityMember = {
  userId: Id;

  communityId: Id;
};

enum CommunityMemberRole {
  MEMBER = 'MEMBER',
  ADMIN = 'ADMIN',
}
