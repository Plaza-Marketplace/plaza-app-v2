curl -L -X POST 'https://uzjrluxkcsipsbtntipl.supabase.co/functions/v1/create-account-link' \
  -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InV6anJsdXhrY3NpcHNidG50aXBsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjEzNDc1OTUsImV4cCI6MjAzNjkyMzU5NX0.mHR2TRVFGd-c3KFzgOXMk-JfPEwB-hHbdWH5Uis5YbQ' \
  -H 'Content-Type: application/json' \
  --data '{"account":"acct_1R2JvMPDBPbyu0XD","return_url":"https://example.com/success","refresh_url":"https://example.com/cancel"}'
# Expected output: a JSON response with a URL to redirect the user for account linking.