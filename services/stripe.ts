import { supabase } from '@/utils/supabase';

const createAccountLink = async (
  account: string,
  returnUrl: string,
  refreshUrl: string
) => {
  console.log('Creating account link for account:', account);

  const { data, error } = await supabase.functions.invoke(
    'create-account-link',
    {
      body: {
        account: account,
        return_url: returnUrl, // Example return URL
        refresh_url: refreshUrl, // Example refresh URL
      },
    }
  );

  if (error) {
    console.error('Error creating account link:', error);
    throw error;
  }

  return data;
};

const createPaymentIntent = async (
  customerId: string,
  accountId: string,
  amount: number,
  currency: string
) => {
  console.log(
    'Creating payment intent for amount:',
    amount,
    'currency:',
    currency
  );

  const { data, error } = await supabase.functions.invoke(
    'create-payment-intent',
    {
      body: {
        customerId: customerId,
        accountId: accountId,
        amount: amount,
        currency: currency,
      },
    }
  );

  if (error) {
    console.error('Error creating payment intent:', error);
    throw error;
  }

  return data;
};

const createStripeAccount = async (userId: Id, email: string) => {
  console.log('Creating Stripe account for email:', email, 'userId:', userId);

  const { data, error } = await supabase.functions.invoke(
    'create-stripe-account',
    {
      body: {
        email: email,
      },
    }
  );

  if (error) {
    console.error('Error creating Stripe account:', error);
    throw error;
  }

  return data;
};

const createStripeCustomer = async (userId: Id, email: string) => {
  console.log('Creating Stripe customer for email:', email, 'userId:', userId);

  const { data, error } = await supabase.functions.invoke(
    'create-stripe-customer',
    {
      body: {
        email: email,
      },
    }
  );

  if (error) {
    console.error('Error creating Stripe customer:', error);
    throw error;
  }

  return data;
};

export {
  createAccountLink,
  createPaymentIntent,
  createStripeAccount,
  createStripeCustomer,
};
