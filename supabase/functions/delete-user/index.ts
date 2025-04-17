import 'https://esm.sh/@supabase/functions-js/src/edge-runtime.d.ts';
import { createClient } from 'jsr:@supabase/supabase-js@2';

Deno.serve(async (req) => {
  const supabaseClient = createClient(
    Deno.env.get('SUPABASE_URL') ?? '',
    Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
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

  console.log(authUser);
  const { data, error } = await supabaseClient.auth.admin.deleteUser(
    authUser.id
  );

  if (error) {
    console.error(error);
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

  return new Response(
    JSON.stringify({
      message: 'user found',
      user: authUser,
    }),
    {
      headers: { 'Content-Type': 'application/json' },
    }
  );
});
