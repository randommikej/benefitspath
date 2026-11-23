-- Weekly certification email reminders. One row per email address; signing up again
-- updates the state/day and reactivates. Only the server (service role) reads or writes
-- this table, so RLS is on with no policies.
create table if not exists cert_reminders (
  id uuid primary key default gen_random_uuid(),
  email text not null,
  state text not null,                 -- two-letter code from lib/data.js STATE_DATA
  weekday smallint not null check (weekday between 0 and 6),  -- 0 = Sunday
  lang text not null default 'en' check (lang in ('en', 'es')),
  token uuid not null default gen_random_uuid(),               -- unsubscribe token
  active boolean not null default true,
  source text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  last_sent_at timestamptz,
  send_count integer not null default 0,
  unsubscribed_at timestamptz
);
create unique index if not exists cert_reminders_email_key on cert_reminders (lower(email));
create unique index if not exists cert_reminders_token_key on cert_reminders (token);
create index if not exists cert_reminders_due on cert_reminders (weekday) where active;
alter table cert_reminders enable row level security;
