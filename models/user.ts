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

  email: string;

  description: string | null;

  profileImageUrl: string | null;

  createdAt: Timestamp;
};

type UpdateUser = {
  id: Id;

  firstName?: string;

  lastName?: string;

  description?: string | null;

  profileImageUrl?: string | null;
};

type Seller = {
  id: Id;

  username: string;

  averageRating: number;
};
