// Follow this setup guide to integrate the Deno language server with your editor:
// https://deno.land/manual/getting_started/setup_your_environment
// This enables autocomplete, go to definition, etc.

// Setup type definitions for built-in Supabase Runtime APIs
import 'https://esm.sh/@supabase/functions-js/src/edge-runtime.d.ts';
import { stripe } from '../_utils/stripe.ts';

console.log('Hello from Functions!');

Deno.serve(async (req) => {
  try {
    const { account } = await req.json();

    console.log(req.headers.origin);
    console.log('Creating account link for account:', account);

    const accountLink = await stripe.accountLinks.create({
      account: account,
      // return_url: `${req.headers.origin}/return/${account}`,
      // refresh_url: `${req.headers.origin}/refresh/${account}`,
      return_url: 'https://example.com/return',
      refresh_url: 'https://example.com/refresh',
      type: 'account_onboarding',
    });

    return new Response(JSON.stringify(accountLink), {
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error(
      'An error occurred when calling the Stripe API to create an account link:',
      error
    );
    return new Response(error.message, {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
});

/* To invoke locally:

  1. Run `supabase start` (see: https://supabase.com/docs/reference/cli/supabase-start)
  2. Make an HTTP request:

  curl -i --location --request POST 'http://127.0.0.1:54321/functions/v1/hello-world' \
    --header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6ImFub24iLCJleHAiOjE5ODM4MTI5OTZ9.CRXP1A7WOeoJeXxjNni43kdQwgnWNReilDMblYTn_I0' \
    --header 'Content-Type: application/json' \
    --data '{"name":"Functions"}'

*/
