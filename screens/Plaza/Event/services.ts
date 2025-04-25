import { supabase } from '@/utils/supabase';
import { Event } from './models';
import { Json } from '@/database.types';
import { getImagePublicUrl } from '@/services/crud/storage';

export const getEvent = async (id: Id): Promise<Event> => {
  const { data, error } = await supabase
    .rpc('get_event', { event_id: id })
    .single();

  if (error) {
    throw new Error(error.message);
  }

  const pins = (data.pins as Json[]) ?? [];
  const products = (data.products as Json[]) ?? [];

  return {
    id: data.id,
    name: data.name,
    coordinates: [data.longitude, data.latitude],
    mapUrl: data.map_key ? getImagePublicUrl(data.map_key) : null,
    pins: pins.map((pin: any) => ({
      id: pin.id,
      name: pin.name,
      coordinates: [pin.longitude, pin.latitude],
    })),
    products: products.map((product: any) => ({
      id: product.id,
      name: product.name,
      price: product.price,
      thumbnailUrl:
        product.image_keys?.length > 0
          ? getImagePublicUrl(product.image_keys[0])
          : null,
      seller: {
        id: product.seller.id,
        username: product.seller.username,
        averageRating: product.seller.average_rating,
        profileImageUrl: product.seller.profile_image_key
          ? getImagePublicUrl(product.seller.profile_image_key)
          : null,
      },
    })),
  };
};

export const createPin = async (
  eventId: Id,
  name: string,
  coordinates: [number, number]
) => {
  const { error } = await supabase.from('event_pin').insert({
    event_id: eventId,
    name,
    coordinates: `SRID=4326;POINT(${coordinates[0]} ${coordinates[1]})`,
  });

  if (error) {
    throw new Error(error.message);
  }
};
