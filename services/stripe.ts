import { supabase } from '@/utils/supabase';

const createEphemeralKey = async (customerId: string) => {
  const { data, error } = await supabase.rpc('create_ephemeral_key', {
    customer_id: customerId,
    stripe_version: '2023-10-16', // Use the latest supported Stripe API version
  });

  if (error) console.error(error);
  else console.log(data);
};

const createPaymentIntent = async (
  customerId: string,
  amount: number,
  currency: string
) => {
  const { data, error } = await supabase.rpc('create_payment_intent', {
    customer_id: customerId,
    amount: amount, // Amount in cents (e.g., $50.00)
    currency: currency,
  });

  if (error) console.error(error);
  else console.log(data);
};

export { createEphemeralKey, createPaymentIntent };
