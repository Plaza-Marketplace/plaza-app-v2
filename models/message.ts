type Message = {
  id: Id;
  senderId: Id;
  recipientId: Id;
  content: string;
  createdAt: string;
}

type CreateMessage = {
  senderId: Id;
  recipientId: Id;
  content: string;
}