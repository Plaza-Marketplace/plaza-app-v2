export type Event = {
  id: Id;

  name: string;

  coordinates: [number, number];

  initialHeading: number | null;

  initialZoom: number | null;

  mapUrl: Url | null;

  pins: {
    id: Id;

    name: string;

    coordinates: [number, number];
  }[];

  borderPins: {
    id: Id;

    coordinates: [number, number];
  }[];

  sellers: {
    id: Id;

    boothName: string;

    username: string | null;

    displayName: string | null;

    profileImageUrl: Url | null;

    products: {
      id: Id;

      name: string;

      price: number | null;

      thumbnailUrl: Url | null;
    }[];
  }[];
};
