export type Event = {
  id: Id;

  name: string;

  address: string;

  city: string;

  state: string;

  startDate: Timestamp;

  endDate: Timestamp;

  bannerUrl: Url | null;
};
