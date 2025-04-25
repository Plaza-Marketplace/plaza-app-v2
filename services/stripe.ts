import { supabase } from '@/utils/supabase';

const createAccountLink = async (
  account: string,
  returnUrl: string,
  refreshUrl: string
) => {
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

const createPayment = async (transfer_group: UUID) => {
  const { data, error } = await supabase.functions.invoke(
    'create-plaza-payment',
    {
      body: {
        transfer_group: transfer_group,
      },
    }
  );

  if (error) {
    console.error('Error creating payment:', error);
    throw error;
  }

  return data;
};

const createBuyNow = async (productId: Id, variantId: Id | null) => {
  const { data, error } = await supabase.functions.invoke('create-buy-now', {
    body: {
      productId: productId,
      variantId: variantId,
    },
  });

  if (error) {
    console.error('Error creating buy now:', error);
    throw error;
  }

  return data;
};

export {
  createAccountLink,
  createPaymentIntent,
  createStripeAccount,
  createStripeCustomer,
  createPayment,
  createBuyNow,
};
