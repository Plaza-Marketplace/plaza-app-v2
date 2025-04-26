export type Event = {
  id: Id;

  name: string;

  coordinates: [number, number];

  mapUrl: Url | null;

  pins: {
    id: Id;

    name: string;

    coordinates: [number, number];
  }[];

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
