import 'https://esm.sh/@supabase/functions-js/src/edge-runtime.d.ts';
import { stripe } from '../_utils/stripe.ts';
import { createClient } from 'jsr:@supabase/supabase-js@2';
console.log('Hello from Functions!');

Deno.serve(async (req) => {
  const { productId } = await req.json();

  if (!productId) {
    return new Response('Missing product ID', { status: 400 });
  }

  const supabaseClient = createClient(
    Deno.env.get('SUPABASE_URL') ?? '',
    Deno.env.get('SUPABASE_ANON_KEY') ?? '',
    {
      global: {
        headers: {
          Authorization: req.headers.get('Authorization'),
        },
      },
    }
  );
  const token = req.headers.get('Authorization').replace('Bearer ', '');
  const {
    data: { user: authUser },
  } = await supabaseClient.auth.getUser(token);

  if (!authUser) {
    return new Response(
      JSON.stringify({
        message: 'user not found',
      }),
      {
        status: 400,
        statusText: 'user not found',
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
  }

  const { data: dbUser, error } = await supabaseClient
    .from('user')
    .select(`id, stripe_customer_id`)
    .eq('auth_id', authUser.id)
    .limit(1)
    .single();

  if (error) {
    return new Response(
      JSON.stringify({
        message: 'user not found in the database',
      }),
      {
        status: 400,
        statusText: 'user not found in the database',
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
  }

  const { data: product } = await supabaseClient
    .from('product')
    .select(`*`)
    .eq('id', productId)
    .single();

  if (!product) {
    return new Response(
      JSON.stringify({
        message: 'product not found',
      }),
      {
        status: 400,
        statusText: 'product not found',
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
  }

  const subtotal = product.price + product.shipping_price;

  const total = Math.ceil((subtotal * 1.029 + 0.3) * 100);
  const currency = 'usd';
  console.log('amount', total);

  console.log(dbUser);

  if (!dbUser.stripe_customer_id) {
    console.log(
      "user didn't have a customer id for some reason, so we'll create it now"
    );
    const customer = await stripe.customers.create();
    await supabaseClient
      .from('user')
      .update({ stripe_customer_id: customer.id })
      .eq('id', dbUser.id);
    dbUser.stripe_customer_id = customer.id;
  }

  const ephemeralKey = await stripe.ephemeralKeys.create(
    { customer: dbUser.stripe_customer_id },
    { apiVersion: '2025-02-24.acacia' }
  );
  const paymentIntent = await stripe.paymentIntents.create({
    amount: total,
    currency: currency,
    customer: dbUser.stripe_customer_id,
    // In the latest version of the API, specifying the `automatic_payment_methods` parameter
    // is optional because Stripe enables its functionality by default.
    automatic_payment_methods: {
      enabled: true,
    },
    // application_fee_amount: 123,
  });

  return new Response(
    JSON.stringify({
      paymentIntent: paymentIntent.client_secret,
      ephemeralKey: ephemeralKey.secret,
      customer: dbUser.stripe_customer_id,
    }),
    {
      headers: { 'Content-Type': 'application/json' },
    }
  );
});
