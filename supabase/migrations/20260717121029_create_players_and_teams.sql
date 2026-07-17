/*
# Create players and saved_teams tables (single-tenant, no auth)

## Overview
Adds the data layer for the Statify AI Fantasy Football app.
Players are global reference data (shared across all users) and saved teams
are the user's assembled squads. This is a single-tenant app with no sign-in
screen, so all policies are scoped to `anon, authenticated` and use `USING (true)`
because the data is intentionally public/shared.

## 1. New Tables

### players
Reference roster of real football players from the 19 supported countries.
- `player_id` (text, primary key) — stable slug like "england-harry-kane"
- `name` (text, not null)
- `photo` (text) — player portrait URL (nullable, UI uses placeholder when null)
- `country` (text, not null) — country name (e.g. "England")
- `country_code` (text, not null) — lowercase ISO-ish code for flag URLs (e.g. "gb-eng")
- `club` (text) — club name
- `club_logo` (text) — club crest URL
- `position` (text, not null) — one of Goalkeeper, Defender, Midfielder, Forward
- `age` (int)
- `height` (text) — e.g. "186 cm"
- `preferred_foot` (text) — Left / Right
- `overall_rating` (int) — 0–100
- `market_value` (bigint) — market value in euros
- `fantasy_price` (numeric) — fantasy price in millions
- `expected_points` (numeric) — projected fantasy points for next gameweek
- `goals` (int)
- `assists` (int)
- `xg` (numeric) — expected goals
- `xa` (numeric) — expected assists
- `pass_accuracy` (numeric) — 0–100 percentage
- `shots` (int)
- `dribbles` (int)
- `tackles` (int)
- `interceptions` (int)
- `fitness` (int) — 0–100 fitness percentage
- `injury_status` (text) — "Fit" / "Doubtful" / "Injured" / "Suspended"
- `injury_type` (text, nullable)
- `form` (numeric) — 0–10 current form rating
- `ownership_percentage` (numeric) — 0–100 fantasy ownership
- `captain_score` (int) — 0–100
- `vice_captain_score` (int) — 0–100
- `ai_value_score` (numeric) — 0–100 AI value
- `jersey_number` (int)
- `created_at` (timestamptz)

### saved_teams
The user's assembled squads (one row = one saved team).
- `id` (uuid, primary key)
- `name` (text) — team name
- `country` (text) — selected country
- `formation` (text) — e.g. "4-3-3"
- `budget_used` (numeric)
- `player_ids` (text[]) — array of player_id slugs
- `captain_id` (text, nullable)
- `vice_captain_id` (text, nullable)
- `created_at` (timestamptz)

## 2. Indexes
- `players_country_idx` on `players(country)` — country filter is the primary access path
- `players_position_idx` on `players(position)` — used by position filters
- `saved_teams_created_idx` on `saved_teams(created_at desc)`

## 3. Security
- RLS enabled on both tables.
- players: read-only public reference data — `TO anon, authenticated` SELECT only
  (the app never writes players from the client; roster updates come via migrations).
- saved_teams: full CRUD for `anon, authenticated` because this is a single-tenant,
  intentionally-public app (no sign-in screen). `USING (true)` is correct here.
*/

CREATE TABLE IF NOT EXISTS players (
  player_id text PRIMARY KEY,
  name text NOT NULL,
  photo text,
  country text NOT NULL,
  country_code text NOT NULL DEFAULT '',
  club text,
  club_logo text,
  position text NOT NULL CHECK (position IN ('Goalkeeper','Defender','Midfielder','Forward')),
  age int,
  height text,
  preferred_foot text,
  overall_rating int,
  market_value bigint,
  fantasy_price numeric,
  expected_points numeric,
  goals int,
  assists int,
  xg numeric,
  xa numeric,
  pass_accuracy numeric,
  shots int,
  dribbles int,
  tackles int,
  interceptions int,
  fitness int,
  injury_status text DEFAULT 'Fit',
  injury_type text,
  form numeric,
  ownership_percentage numeric,
  captain_score int,
  vice_captain_score int,
  ai_value_score numeric,
  jersey_number int,
  created_at timestamptz DEFAULT now()
);

CREATE INDEX IF NOT EXISTS players_country_idx ON players(country);
CREATE INDEX IF NOT EXISTS players_position_idx ON players(position);

CREATE TABLE IF NOT EXISTS saved_teams (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  country text NOT NULL,
  formation text NOT NULL DEFAULT '4-3-3',
  budget_used numeric NOT NULL DEFAULT 0,
  player_ids text[] NOT NULL DEFAULT '{}',
  captain_id text,
  vice_captain_id text,
  created_at timestamptz DEFAULT now()
);

CREATE INDEX IF NOT EXISTS saved_teams_created_idx ON saved_teams(created_at DESC);

ALTER TABLE players ENABLE ROW LEVEL SECURITY;
ALTER TABLE saved_teams ENABLE ROW LEVEL SECURITY;

-- players: read-only public reference data
DROP POLICY IF EXISTS "anon_read_players" ON players;
CREATE POLICY "anon_read_players"
  ON players FOR SELECT
  TO anon, authenticated USING (true);

-- saved_teams: single-tenant, intentionally public — full CRUD for anon + authenticated
DROP POLICY IF EXISTS "anon_select_saved_teams" ON saved_teams;
CREATE POLICY "anon_select_saved_teams"
  ON saved_teams FOR SELECT
  TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "anon_insert_saved_teams" ON saved_teams;
CREATE POLICY "anon_insert_saved_teams"
  ON saved_teams FOR INSERT
  TO anon, authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "anon_update_saved_teams" ON saved_teams;
CREATE POLICY "anon_update_saved_teams"
  ON saved_teams FOR UPDATE
  TO anon, authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "anon_delete_saved_teams" ON saved_teams;
CREATE POLICY "anon_delete_saved_teams"
  ON saved_teams FOR DELETE
  TO anon, authenticated USING (true);
