import { Tables } from '@/database.types';
import { supabase } from '@/utils/supabase';

const formatAddress = (address: Tables<'address'>): Address => {
  return {
    id: address.id,
    addressedTo: address.addressed_to,
    country: address.country,
    addressLine1: address.addr_line1,
    addressLine2: address.addr_line2,
    city: address.city,
    state: address.state,
    zipCode: address.zip_code,
    createdAt: address.created_at,
    createdId: address.created_id,
  };
};

const createAddress = async (address: CreateAddress): Promise<Address> => {
  const { data, error } = await supabase
    .from('address')
    .insert({
      addressed_to: address.addressedTo,
      country: address.country,
      addr_line1: address.addressLine1,
      addr_line2: address.addressLine2,
      city: address.city,
      state: address.state,
      zip_code: address.zipCode,
      created_id: address.createdId,
    })
    .select('*')
    .single();

  if (error) throw new Error(error.message);
  if (!data) throw new Error('No data returned');

  return formatAddress(data);
};

const deleteAddress = async (addressId: Id): Promise<Address> => {
  const { data, error } = await supabase
    .from('address')
    .delete()
    .eq('id', addressId)
    .select('*')
    .single();

  console.log(data, error);

  if (error) throw new Error(error.message);
  if (!data) throw new Error('No data returned');

  return formatAddress(data);
};

const getAddress = async (addressId: Id) => {
  const { data, error } = await supabase
    .from('address')
    .select('*')
    .eq('id', addressId)
    .single();

  if (error) throw new Error(error.message);
  if (!data) throw new Error('No data returned');

  return formatAddress(data);
};

const getAddresses = async (userId: Id): Promise<Address[]> => {
  const { data, error } = await supabase
    .from('address')
    .select('*')
    .eq('created_id', userId);

  console.log(data, error);

  if (error) throw new Error(error.message);
  if (!data) throw new Error('No data returned');

  return data.map(formatAddress);
};

export { createAddress, deleteAddress, getAddress, getAddresses };
