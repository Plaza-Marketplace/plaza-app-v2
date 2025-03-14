type CommunityMember = {
  id: Id;

  userId: Id;

  communityId: Id;

  createdAt: Timestamp;
};

type CreateCommunityMember = {
  userId: Id;

  communityId: Id;
};

type DeleteCommunityMember = {
  userId: Id;

  communityId: Id;
};
