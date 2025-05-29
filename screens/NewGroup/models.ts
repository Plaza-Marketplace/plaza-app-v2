export type CreateGroup = {
  userId: Id;

  name: string;

  description: string | null;

  bannerBase64: string | null;

  iconBase64: string | null;
};
