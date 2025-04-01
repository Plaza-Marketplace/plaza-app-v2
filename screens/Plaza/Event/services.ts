import { supabase } from '@/utils/supabase';
import { Event } from './models';

export const getEvent = async (id: Id): Promise<Event> => {
  const { data, error } = await supabase
    .rpc('get_event', { event_id: id })
    .single();

  if (error) {
    throw new Error(error.message);
  }
  return {
    name: data.name,
    coordinates: [data.longitude, data.latitude],
  };
};
