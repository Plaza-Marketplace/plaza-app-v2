import { supabase } from '@/utils/supabase';
import { Event } from './models';
import { getImagePublicUrl } from '@/services/crud/storage';

export const getEvents = async (): Promise<Event[]> => {
  const { data, error } = await supabase.from('event').select(
    `
        id,
        name,
        start_date,
        end_date,
        city,
        state,
        address,
        banner_key
      `
  );

  if (error) {
    throw new Error(error.message);
  }

  return data.map((event) => ({
    id: event.id,
    name: event.name,
    startDate: event.start_date,
    endDate: event.end_date,
    city: event.city,
    state: event.state,
    address: event.address,
    bannerUrl: event.banner_key ? getImagePublicUrl(event.banner_key) : null,
  }));
};
