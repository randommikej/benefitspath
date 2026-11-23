-- Tracks the twice-daily attorney referral drafting for attorney_request leads.
-- referral_status: null = not processed yet | 'drafted' | 'duplicate' | 'skipped'
alter table leads add column if not exists referral_status text;
alter table leads add column if not exists referral_attorney text;
alter table leads add column if not exists referral_draft_id text;
alter table leads add column if not exists referral_note text;
alter table leads add column if not exists referral_at timestamptz;
create index if not exists leads_attorney_request_pending
  on leads (created_at) where type = 'attorney_request' and referral_status is null;
