type Address = {
  id: Id;
  addressedTo: string;
  country: string;
  addressLine1: string;
  addressLine2: string | null;
  city: string;
  state: string;
  zipCode: string;
  createdAt: Timestamp;
  createdId: Id;
};

type CreateAddress = Omit<Address, 'id' | 'createdAt'>;
