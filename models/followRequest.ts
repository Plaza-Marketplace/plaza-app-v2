import User from "./user";

export type FollowRequest = {
  id: Id;
  sender: Omit<User, 'authId' | 'email' | 'description' | 'createdAt' | 'location'>;
  recipient: Omit<User, 'authId' | 'email' | 'description' | 'createdAt' | 'location'>;
  createdAt: string;
}

export type CreateFollowRequest = {
  senderId: Id;
  recipientId: Id;
}