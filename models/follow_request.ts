type FollowRequest = {
  id: Id;
  senderId: Id;
  recipientId: Id;
  createdAt: string;
}

type CreateFollowRequest = {
  senderId: Id;
  recipientId: Id;
}