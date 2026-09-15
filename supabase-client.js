/* ===========================================================
   SLOCO–YSG — Supabase client
   The URL and anon/public key below are MEANT to be visible in
   client-side code — that's how every Supabase-backed website
   works. Access control comes from Row Level Security policies
   on the database (see supabase-setup.sql), not from hiding
   these values. Never put the "service_role" key here.
=========================================================== */
(function (global) {
  "use strict";

  var SUPABASE_URL = "https://hhkqvgodgkjwanadahry.supabase.co";
  var SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imhoa3F2Z29kZ2tqd2FuYWRhaHJ5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODg4NDIzOTQsImV4cCI6MjEwNDQxODM5NH0.GF_bef8wy5fA9Dd_-9kR6WS78--cE44DeqSB1f9GZc4";

  if (!global.supabase || !global.supabase.createClient) {
    console.error("Supabase SDK failed to load — check your internet connection and that the <script> tag for @supabase/supabase-js loads before this file.");
    return;
  }

  global.sb = global.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
})(window);
