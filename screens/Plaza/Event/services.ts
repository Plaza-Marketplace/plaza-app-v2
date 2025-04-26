import { supabase } from '@/utils/supabase';
import { getImagePublicUrl } from '@/services/crud/storage';
import { Json } from '@/database.types';
import { Event } from './models';

export const getEventPage = async (eventId: Id): Promise<Event> => {
  const { data, error } = await supabase
    .rpc('get_event_page', { event_id: eventId })
    .single();

  if (error) {
    throw new Error(error.message);
  }

  const pins = (data.pins as Json[]) ?? [];
  const sellers = (data.sellers as Json[]) ?? [];

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

    sellers: sellers.map((seller: any) => ({
      id: seller.id,
      username: seller.username,
      displayName: seller.display_name,
      boothName: seller.booth_name,
      profileImageUrl: seller.profile_image_key
        ? getImagePublicUrl(seller.profile_image_key)
        : null,
      products: seller.products
        ? seller.products.map((product: any) => ({
            id: product.id,
            name: product.name,
            price: product.price,
            thumbnailUrl:
              product.image_keys?.length > 0
                ? getImagePublicUrl(product.image_keys[0])
                : null,
          }))
        : [],
    })),
  };
};

export const getNextEventSellers = async (
  eventId: Id,
  lastSellerId: Id
): Promise<Event['sellers']> => {
  const { data, error } = await supabase
    .from('event_seller')
    .select(
      `
      id,
      booth_name,
      user (
        id,
        username,
        display_name,
        profile_image_key,
        event_product (
          product (
            id,
            name,
            price,
            image_keys: product_image (
              image_key
            )
          )
          
        )
      )
    `
    )
    .order('created_at', { ascending: false })
    .eq('event_id', eventId)
    .gt('id', lastSellerId)
    .limit(10);

  if (error) {
    throw new Error(error.message);
  }

  return data.map((seller) => ({
    id: seller.id,
    boothName: seller.booth_name,
    username: seller.user.username,
    displayName: seller.user.display_name,
    profileImageUrl: seller.user.profile_image_key
      ? getImagePublicUrl(seller.user.profile_image_key)
      : null,
    products: seller.user.event_product.map((product) => ({
      id: product.product.id,
      name: product.product.name,
      price: product.product.price,
      thumbnailUrl:
        product.product.image_keys?.length > 0
          ? getImagePublicUrl(product.product.image_keys[0].image_key)
          : null,
    })),
  }));
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
