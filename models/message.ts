import User from "./user";

export type Message = {
  id: Id;
  conversationId: Id;
  sender: Pick<User, "id" | "username" | "profileImageUrl">;
  content: string;
  createdAt: string;
}

export type CreateMessage = {
  userId: Id;
  conversationId: Id;
  content: string;
}