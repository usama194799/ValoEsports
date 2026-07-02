-- Create player_profiles table extending auth.users
create table public.player_profiles (
  id uuid references auth.users(id) on delete cascade primary key,
  username text unique not null,
  first_name text,
  last_name text,
  bio text,
  avatar_url text,
  banner_url text,
  country text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Set up Row Level Security (RLS)
alter table public.player_profiles enable row level security;

-- Policy: Profiles are viewable by everyone
create policy "Public profiles are viewable by everyone." 
  on public.player_profiles for select 
  using (true);

-- Policy: Users can insert their own profile (in case trigger fails or manual insert needed)
create policy "Users can insert their own profile." 
  on public.player_profiles for insert 
  with check (auth.uid() = id);

-- Policy: Users can update their own profile
create policy "Users can update their own profile." 
  on public.player_profiles for update 
  using (auth.uid() = id);

-- Function: Automatically handle new user signups
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
  insert into public.player_profiles (id, username, first_name, last_name, avatar_url)
  values (
    new.id,
    coalesce(new.raw_user_meta_data->>'username', 'player_' || substr(new.id::text, 1, 8)),
    new.raw_user_meta_data->>'first_name',
    new.raw_user_meta_data->>'last_name',
    new.raw_user_meta_data->>'avatar_url'
  );
  return new;
end;
$$;

-- Trigger: Fire function on insert to auth.users
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();
