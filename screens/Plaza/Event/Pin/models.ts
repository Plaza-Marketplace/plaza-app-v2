export type Pin = {
  id: Id;

  name: string;

  sellers: {
    id: Id;

    boothName: string;

    username: string | null;

    profileImageUrl: Url | null;

    products: {
      id: Id;

      name: string;

      price: number | null;

      thumbnailUrl: Url | null;
    }[];
  }[];
};
