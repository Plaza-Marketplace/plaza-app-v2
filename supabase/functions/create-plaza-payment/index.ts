import 'https://esm.sh/@supabase/functions-js/src/edge-runtime.d.ts';
import { stripe } from '../_utils/stripe.ts';
import { createClient } from 'jsr:@supabase/supabase-js@2';
console.log('Hello from Functions!');

Deno.serve(async (req) => {
  const { transfer_group } = await req.json();

  console.log(transfer_group);

  if (!transfer_group) {
    return new Response('Missing transfer_group', { status: 400 });
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

  const { data: cartContents, error: cartError } = await supabaseClient
    .from('cart_item')
    .select(
      `
      *,
      product(
        *,
        product_variant (
          id,
          price,
          product_variant_option (
            id,
            product_variant_value (
              id,
              name,
              product_variant_type (
                id,
                name
              )
            )
          )
        )
      )
    `
    )
    .eq('user_id', dbUser.id);

  console.log('cartContents', cartContents);
  console.error('cartError', cartError);
  if (cartError) {
    return new Response(
      JSON.stringify({
        message: 'cart not found',
      }),
      {
        status: 400,
        statusText: 'cart not found',
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
  }

  let amount = 0;

  cartContents.forEach((item) => {
    if (item.product.has_variants) {
      const chosenVariant = item.product.product_variant.find((variant) => {
        return variant.id === item.variant_id;
      });
      amount += chosenVariant.price * item.quantity;
      amount += item.product.shipping_price;
    } else {
      amount += item.product.price * item.quantity;
      amount += item.product.shipping_price;
    }
  });

  const total = Math.ceil((amount * 1.029 + 0.3) * 100);
  const currency = 'usd';
  console.log('amount', amount);

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
    transfer_group: transfer_group,
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
