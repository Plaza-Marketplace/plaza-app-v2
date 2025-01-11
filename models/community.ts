type Community = {
  id: number;
  name: string;
  description: string;
  iconUrl: string;
  backgroundUrl: string;
  createdAt: string;
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
