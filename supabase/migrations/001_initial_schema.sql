-- Create custom types
create type application_status as enum ('draft', 'in_progress', 'completed', 'submitted');

-- Organizations table
create table public.organizations (
  id uuid default gen_random_uuid() primary key,
  name text not null,
  mission text,
  contact_email text not null,
  contact_phone text,
  tax_id text,
  is_501c3 boolean default false,
  annual_revenue numeric,
  annual_expenses numeric,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null,
  user_id uuid references auth.users(id) on delete cascade not null
);

-- Grant applications table
create table public.grant_applications (
  id uuid default gen_random_uuid() primary key,
  title text not null,
  status application_status default 'draft',
  organization_id uuid references public.organizations(id) on delete cascade not null,
  template_type text,
  rfp_file_url text,
  content jsonb default '{}',
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- RFP analyses table (for storing AI analysis of uploaded RFPs)
create table public.rfp_analyses (
  id uuid default gen_random_uuid() primary key,
  application_id uuid references public.grant_applications(id) on delete cascade not null,
  requirements text[],
  deadline text,
  funding_amount text,
  focus_areas text[],
  key_sections text[],
  analysis_data jsonb default '{}',
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable Row Level Security
alter table public.organizations enable row level security;
alter table public.grant_applications enable row level security;
alter table public.rfp_analyses enable row level security;

-- Create policies
create policy "Users can view their own organizations" on public.organizations
  for select using (auth.uid() = user_id);

create policy "Users can insert their own organizations" on public.organizations
  for insert with check (auth.uid() = user_id);

create policy "Users can update their own organizations" on public.organizations
  for update using (auth.uid() = user_id);

create policy "Users can delete their own organizations" on public.organizations
  for delete using (auth.uid() = user_id);

create policy "Users can view applications for their organizations" on public.grant_applications
  for select using (
    organization_id in (
      select id from public.organizations where user_id = auth.uid()
    )
  );

create policy "Users can insert applications for their organizations" on public.grant_applications
  for insert with check (
    organization_id in (
      select id from public.organizations where user_id = auth.uid()
    )
  );

create policy "Users can update applications for their organizations" on public.grant_applications
  for update using (
    organization_id in (
      select id from public.organizations where user_id = auth.uid()
    )
  );

create policy "Users can delete applications for their organizations" on public.grant_applications
  for delete using (
    organization_id in (
      select id from public.organizations where user_id = auth.uid()
    )
  );

create policy "Users can view RFP analyses for their applications" on public.rfp_analyses
  for select using (
    application_id in (
      select ga.id from public.grant_applications ga
      join public.organizations o on ga.organization_id = o.id
      where o.user_id = auth.uid()
    )
  );

create policy "Users can insert RFP analyses for their applications" on public.rfp_analyses
  for insert with check (
    application_id in (
      select ga.id from public.grant_applications ga
      join public.organizations o on ga.organization_id = o.id
      where o.user_id = auth.uid()
    )
  );

-- Create indexes for better performance
create index idx_organizations_user_id on public.organizations(user_id);
create index idx_grant_applications_organization_id on public.grant_applications(organization_id);
create index idx_grant_applications_status on public.grant_applications(status);
create index idx_rfp_analyses_application_id on public.rfp_analyses(application_id);

-- Create updated_at trigger function
create or replace function public.handle_updated_at()
returns trigger as $$
begin
  new.updated_at = timezone('utc'::text, now());
  return new;
end;
$$ language plpgsql;

-- Create triggers for updated_at
create trigger handle_organizations_updated_at
  before update on public.organizations
  for each row execute function public.handle_updated_at();

create trigger handle_grant_applications_updated_at
  before update on public.grant_applications
  for each row execute function public.handle_updated_at();