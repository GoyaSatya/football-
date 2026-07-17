export type Position = "Goalkeeper" | "Defender" | "Midfielder" | "Forward";

export type InjuryStatus = "Fit" | "Doubtful" | "Injured" | "Suspended";

export interface Player {
  player_id: string;
  name: string;
  photo: string | null;
  country: string;
  country_code: string;
  club: string;
  club_logo: string | null;
  position: Position;
  age: number;
  height: string;
  preferred_foot: "Left" | "Right";
  overall_rating: number;
  market_value: number;
  fantasy_price: number;
  expected_points: number;
  goals: number;
  assists: number;
  xg: number;
  xa: number;
  pass_accuracy: number;
  shots: number;
  dribbles: number;
  tackles: number;
  interceptions: number;
  fitness: number;
  injury_status: InjuryStatus;
  injury_type: string | null;
  form: number;
  ownership_percentage: number;
  captain_score: number;
  vice_captain_score: number;
  ai_value_score: number;
  jersey_number: number;
}

export interface SavedTeam {
  id: string;
  name: string;
  country: string;
  formation: string;
  budget_used: number;
  player_ids: string[];
  captain_id: string | null;
  vice_captain_id: string | null;
  created_at: string;
}

export interface Country {
  name: string;
  code: string;
  flag: string;
  confederation: string;
  tint: string;
  accent: string;
}

export type SortKey =
  | "rating"
  | "price_low"
  | "popular"
  | "xpts"
  | "ai_value";

export interface Filters {
  position: Position | "All";
  club: string | "All";
  ageMax: number;
  priceMax: number;
  xptsMin: number;
  formMin: number;
  fitnessMin: number;
  availability: InjuryStatus | "All";
  popularityMin: number;
  sort: SortKey;
}

export const DEFAULT_FILTERS: Filters = {
  position: "All",
  club: "All",
  ageMax: 45,
  priceMax: 20,
  xptsMin: 0,
  formMin: 0,
  fitnessMin: 0,
  availability: "All",
  popularityMin: 0,
  sort: "rating",
};

export const BUDGET = 100;
export const SQUAD_LIMIT = 15;
export const FORMATIONS = ["4-3-3", "4-4-2", "3-5-2", "5-3-2", "4-2-3-1"] as const;
export type Formation = (typeof FORMATIONS)[number];

export const FORMATION_LIMITS: Record<Formation, Record<Position, number>> = {
  "4-3-3": { Goalkeeper: 1, Defender: 4, Midfielder: 3, Forward: 3 },
  "4-4-2": { Goalkeeper: 1, Defender: 4, Midfielder: 4, Forward: 2 },
  "3-5-2": { Goalkeeper: 1, Defender: 3, Midfielder: 5, Forward: 2 },
  "5-3-2": { Goalkeeper: 1, Defender: 5, Midfielder: 3, Forward: 2 },
  "4-2-3-1": { Goalkeeper: 1, Defender: 4, Midfielder: 5, Forward: 1 },
};
