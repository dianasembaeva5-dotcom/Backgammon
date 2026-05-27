create table if not exists profiles (
  id uuid primary key references auth.users(id),
  username text,
  city text,
  avatar_url text,
  rating integer default 1000,
  total_games integer default 0,
  wins integer default 0,
  losses integer default 0,
  current_streak integer default 0,
  best_streak integer default 0,
  created_at timestamp default now()
);

create table if not exists games (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references profiles(id),
  mode text,
  opponent text,
  result text,
  moves_count integer,
  duration_seconds integer,
  rating_change integer default 0,
  final_state jsonb,
  created_at timestamp default now()
);

create table if not exists game_moves (
  id uuid primary key default gen_random_uuid(),
  game_id uuid references games(id),
  move_number integer,
  player text,
  dice jsonb,
  move jsonb,
  board_state jsonb,
  created_at timestamp default now()
);

create table if not exists coach_reports (
  id uuid primary key default gen_random_uuid(),
  game_id uuid references games(id),
  summary text,
  style text,
  strengths jsonb,
  mistakes jsonb,
  tips jsonb,
  created_at timestamp default now()
);

create table if not exists rooms (
  id uuid primary key default gen_random_uuid(),
  room_code text unique,
  player_one uuid references profiles(id),
  player_two uuid references profiles(id),
  status text default 'waiting',
  game_state jsonb,
  created_at timestamp default now()
);
