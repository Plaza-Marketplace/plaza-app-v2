type User = {
  /**
   * The user's unique identifier.
   * Policy: read only, no one can write to this field.
   */
  id: Id;

  authId: UUID;

  firstName: string;

  lastName: string;

  /**
   * The user's username.
   * Policy: only the user can change this
   */
  username: string;

  displayName: string;

  email: string;

  description: string | null;

  profileImageUrl: string | null;

  createdAt: Timestamp;

  stripeCustomerId: string | null;

  stripeAccountId: string | null;
};

type UpdateUser = {
  id: Id;

  firstName?: string;

  lastName?: string;

  username?: string;

  displayName?: string;

  description?: string | null;

  profileImageBase64?: string | null;

  stripeAccountId?: string | null;

  stripeCustomerId?: string | null;
};

type Seller = {
  id: Id;

  username: string;

  averageRating: number;
};
