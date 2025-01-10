type User = {
  /**
   * The user's unique identifier.
   * Policy: read only, no one can write to this field.
   */
  id: number;

  /**
   * The user's username.
   * Policy: only the user can change this
   */
  username: string;

  /**
   * The user's unique identifier.
   * Policy:
   */
  rating?: number;
  time;
};

export default User;
