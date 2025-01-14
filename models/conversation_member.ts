import User from "./user";

export type ConversationMember = {
  id: Id;
  conversationId: Id;
  user: Pick<User, "id" | "username" | "profileImageUrl">;
  createdAt: string;
}

export type CreateConversationMember = {
  conversationId: Id;
  userId: Id;
}