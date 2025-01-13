type Community = {
  id: number;
  name: string;
  memberCount: number;
  description: string;
  iconUrl: string;
  backgroundUrl: string;
  createdAt: Timestamp;
};

type CreateCommunity = {
  name: string;
  description: string;
  iconUrl: string;
  backgroundUrl: string;
}

type UpdateCommunity = {
  name: string;
  description: string;
  iconUrl: string;
  backgroundUrl: string;
}
