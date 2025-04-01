export type ProductModalProduct = {
  id: Id;

  name: string;

  description: string;

  price: number | null;

  imageUrls: Url[];

  createdAt: Timestamp;

  hasVariants: boolean;

  // Maps variant type to variant values
  variants: Record<string, string[]>;

  variantInfo: {
    id: Id;

    selectedVariants: Record<string, string>;

    price: number | null;
  }[];

  seller: {
    id: Id;

    username: string;

    averageRating: number;

    reviews: {
      id: Id;

      rating: number;

      description: string;

      createdAt: Timestamp;

      poster: {
        id: Id;

        username: string;

        profileImageUrl: Url | null;
      };
    }[];
  };
};
