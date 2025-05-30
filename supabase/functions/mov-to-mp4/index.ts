// Setup type definitions for built-in Supabase Runtime APIs
import 'jsr:@supabase/functions-js/edge-runtime.d.ts';
console.info('server started');
import ffmpegPath from 'npm:ffmpeg-static';
import ffmpeg from 'npm:fluent-ffmpeg';
import { createClient } from 'jsr:@supabase/supabase-js@2';
import * as fs from 'node:fs';

ffmpeg.setFfmpegPath(ffmpegPath);
Deno.serve(async (req) => {
  console.log('testing if ffmpeg is working');
  console.log(ffmpegPath);
  console.log(ffmpeg);
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
  const key = '1b103cf8-d977-4739-b274-aa4a56f25c8a';
  const url = supabaseClient.storage
    .from('videos')
    .getPublicUrl(`private/${key}`, {}).data.publicUrl;
  ffmpeg(url) // Global encoding options (applied to all outputs).
    .output('/tmp/outputfile.mp4')
    .videoCodec('libx264');

  fs.readFile('/tmp/outputfile.mp4', (err, data) => {
    if (err) {
      console.error('Error reading file:', err);
      return;
    }
    console.log('File length:', data.byteLength);
  });

  const data = {
    message: 'wow ffmpeg is working !',
  };
  return new Response(JSON.stringify(data), {
    headers: {
      'Content-Type': 'application/json',
      Connection: 'keep-alive',
    },
  });
});
