export type OrderScreen = {
  seller: {
    id: Id;

    username: string;

    profileImageUrl: Url | null;
  };

  product: {
    id: Id;

    name: string;

    finalPrice: number;

    thumbnailUrl: Url | null;
  };

  address: {
    id: Id;

    addressLine1: string;

    addressLine2: string | null;

    country: string;

    city: string;

    state: string;

    zipCode: string;
  };
};
