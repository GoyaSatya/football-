import type { Country } from "./types";

export const COUNTRIES: Country[] = [
  { name: "Argentina", code: "ar", flag: "https://flagcdn.com/ar.svg", confederation: "CONMEBOL", tint: "#75aadb", accent: "#e0e0e0" },
  { name: "Belgium", code: "be", flag: "https://flagcdn.com/be.svg", confederation: "UEFA", tint: "#fdda24", accent: "#ed2939" },
  { name: "Brazil", code: "br", flag: "https://flagcdn.com/br.svg", confederation: "CONMEBOL", tint: "#fed443", accent: "#009b3a" },
  { name: "Cameroon", code: "cm", flag: "https://flagcdn.com/cm.svg", confederation: "CAF", tint: "#007a5e", accent: "#fcd116" },
  { name: "Croatia", code: "hr", flag: "https://flagcdn.com/hr.svg", confederation: "UEFA", tint: "#d41b30", accent: "#f5f5f5" },
  { name: "Ecuador", code: "ec", flag: "https://flagcdn.com/ec.svg", confederation: "CONMEBOL", tint: "#ffd100", accent: "#003893" },
  { name: "Egypt", code: "eg", flag: "https://flagcdn.com/eg.svg", confederation: "CAF", tint: "#d6312b", accent: "#0d0d0d" },
  { name: "England", code: "gb-eng", flag: "https://flagcdn.com/gb-eng.svg", confederation: "UEFA", tint: "#e0e0e0", accent: "#cf142b" },
  { name: "France", code: "fr", flag: "https://flagcdn.com/fr.svg", confederation: "UEFA", tint: "#0055a4", accent: "#ef4135" },
  { name: "Italy", code: "it", flag: "https://flagcdn.com/it.svg", confederation: "UEFA", tint: "#008c45", accent: "#cd212a" },
  { name: "Netherlands", code: "nl", flag: "https://flagcdn.com/nl.svg", confederation: "UEFA", tint: "#ff7900", accent: "#21468b" },
  { name: "Norway", code: "no", flag: "https://flagcdn.com/no.svg", confederation: "UEFA", tint: "#ef2b2d", accent: "#002868" },
  { name: "Poland", code: "pl", flag: "https://flagcdn.com/pl.svg", confederation: "UEFA", tint: "#e6e6e6", accent: "#d4213a" },
  { name: "Portugal", code: "pt", flag: "https://flagcdn.com/pt.svg", confederation: "UEFA", tint: "#006600", accent: "#ff0000" },
  { name: "Senegal", code: "sn", flag: "https://flagcdn.com/sn.svg", confederation: "CAF", tint: "#00853f", accent: "#fdef42" },
  { name: "South Korea", code: "kr", flag: "https://flagcdn.com/kr.svg", confederation: "AFC", tint: "#cd2e3a", accent: "#0047a0" },
  { name: "Spain", code: "es", flag: "https://flagcdn.com/es.svg", confederation: "UEFA", tint: "#c60b1e", accent: "#ffc400" },
  { name: "Sweden", code: "se", flag: "https://flagcdn.com/se.svg", confederation: "UEFA", tint: "#005293", accent: "#fecc00" },
  { name: "Uruguay", code: "uy", flag: "https://flagcdn.com/uy.svg", confederation: "CONMEBOL", tint: "#7bb3e0", accent: "#f5f5f5" },
];

export const COUNTRY_NAMES = COUNTRIES.map((c) => c.name);

export const COUNTRY_BY_NAME: Record<string, Country> = Object.fromEntries(
  COUNTRIES.map((c) => [c.name, c])
);

export const POSITION_OPTIONS = ["All", "Goalkeeper", "Defender", "Midfielder", "Forward"] as const;

export const AVAILABILITY_OPTIONS = ["All", "Fit", "Doubtful", "Injured", "Suspended"] as const;

export const SORT_OPTIONS: { key: import("./types").SortKey; label: string }[] = [
  { key: "rating", label: "Highest Rating" },
  { key: "price_low", label: "Lowest Price" },
  { key: "popular", label: "Most Popular" },
  { key: "xpts", label: "Highest Expected Points" },
  { key: "ai_value", label: "Best AI Value" },
];

export const CLUB_LOGOS: Record<string, string> = {
  "Manchester City": "https://upload.wikimedia.org/wikipedia/en/e/eb/Manchester_City_FC_badge.svg",
  "Real Madrid": "https://upload.wikimedia.org/wikipedia/en/5/56/Real_Madrid_CF.svg",
  "Bayern Munich": "https://upload.wikimedia.org/wikipedia/commons/1/1b/FC_Bayern_M%C3%BCnchen_logo_%282017%29.svg",
  "Liverpool": "https://upload.wikimedia.org/wikipedia/en/0/0c/Liverpool_FC.svg",
  "Barcelona": "https://upload.wikimedia.org/wikipedia/en/4/47/FC_Barcelona_%28crest%29.svg",
  "Atletico Madrid": "https://upload.wikimedia.org/wikipedia/en/f/f4/Atletico_Madrid_2017_logo.svg",
  "Paris Saint-Germain": "https://upload.wikimedia.org/wikipedia/en/a/a7/Paris_Saint-Germain_F.C..svg",
  "Chelsea": "https://upload.wikimedia.org/wikipedia/en/c/cc/Chelsea_FC.svg",
  "Arsenal": "https://upload.wikimedia.org/wikipedia/en/5/53/Arsenal_FC.svg",
  "Manchester United": "https://upload.wikimedia.org/wikipedia/en/7/7a/Manchester_United_FC_crest.svg",
  "Tottenham Hotspur": "https://upload.wikimedia.org/wikipedia/en/b/b4/Tottenham_Hotspur_FC.svg",
  "Inter Milan": "https://upload.wikimedia.org/wikipedia/commons/0/05/FC_Internazionale_Milano_2021.svg",
  "AC Milan": "https://upload.wikimedia.org/wikipedia/commons/d/d0/Logo_of_AC_Milan.svg",
  "Juventus": "https://upload.wikimedia.org/wikipedia/commons/b/bc/Juventus_FC_2017_logo.svg",
  "Napoli": "https://upload.wikimedia.org/wikipedia/commons/e/e0/SSC_Napoli.svg",
  "Roma": "https://upload.wikimedia.org/wikipedia/en/f/f7/AS_Roma.svg",
  "Lazio": "https://upload.wikimedia.org/wikipedia/en/2/2a/SS_Lazio.svg",
  "Atalanta": "https://upload.wikimedia.org/wikipedia/en/0/0b/Atalanta_BC_2020_logo.svg",
  "Borussia Dortmund": "https://upload.wikimedia.org/wikipedia/commons/6/67/Borussia_Dortmund_1910_logo.svg",
  "RB Leipzig": "https://upload.wikimedia.org/wikipedia/en/0/04/RB_Leipzig_2014_logo.svg",
  "Leverkusen": "https://upload.wikimedia.org/wikipedia/en/5/58/Bayer_Leverkusen.svg",
  "Atletico Mineiro": "https://upload.wikimedia.org/wikipedia/en/2/2c/Clube_Atl%C3%A9tico_Mineiro_crest.svg",
  "Flamengo": "https://upload.wikimedia.org/wikipedia/en/0/0a/Clube_de_Regatas_do_Flamengo_-_bra%C3%A7o_%281980%29.svg",
  "Palmeiras": "https://upload.wikimedia.org/wikipedia/en/8/84/SE_Palmeiras_logo.svg",
  "Botafogo": "https://upload.wikimedia.org/wikipedia/en/c/c3/Botafogo_de_Futebol_e_Regatas_logo.svg",
  "Al-Hilal": "https://upload.wikimedia.org/wikipedia/en/1/13/Al_Hilal_SFC_Logo.svg",
  "Al-Nassr": "https://upload.wikimedia.org/wikipedia/en/9/97/Al-Nassr_FC_Logo.svg",
  "Ajax": "https://upload.wikimedia.org/wikipedia/en/8/8a/Ajax_Amsterdam.svg",
  "PSV": "https://upload.wikimedia.org/wikipedia/en/1/1b/PSV_Eindhoven.svg",
  "Feyenoord": "https://upload.wikimedia.org/wikipedia/en/8/81/Feyenoord_logo.svg",
  "Fenerbahce": "https://upload.wikimedia.org/wikipedia/en/2/2b/Fenerbah%C3%A7e_SK.svg",
  "Galatasaray": "https://upload.wikimedia.org/wikipedia/en/1/1e/Galatasaray_SK.svg",
  "Sevilla": "https://upload.wikimedia.org/wikipedia/en/6/67/Sevilla_FC_logo.svg",
  "Villarreal": "https://upload.wikimedia.org/wikipedia/en/3/35/Villarreal_CF_logo.svg",
  "Real Sociedad": "https://upload.wikimedia.org/wikipedia/en/5/55/Real_Sociedad_logo.svg",
  "Benfica": "https://upload.wikimedia.org/wikipedia/en/2/2b/SL_Benfica_logo.svg",
  "Sporting CP": "https://upload.wikimedia.org/wikipedia/en/1/1a/Sporting_Clube_de_Portugal_%28crest%29.svg",
  "Porto": "https://upload.wikimedia.org/wikipedia/en/1/12/FC_Porto.svg",
  "Celtic": "https://upload.wikimedia.org/wikipedia/en/5/53/Celtic_FC.svg",
  "Brighton": "https://upload.wikimedia.org/wikipedia/en/f/f5/Brighton_%26_Hove_Albion_FC_logo.svg",
  "Aston Villa": "https://upload.wikimedia.org/wikipedia/en/1/1b/Aston_Villa_FC.svg",
  "West Ham United": "https://upload.wikimedia.org/wikipedia/en/e/e2/West_Ham_United_FC.svg",
  "Newcastle United": "https://upload.wikimedia.org/wikipedia/en/5/56/Newcastle_United_Logo.svg",
  "Rennes": "https://upload.wikimedia.org/wikipedia/en/d/de/Stade_Rennais_FC_2021.svg",
  "Marseille": "https://upload.wikimedia.org/wikipedia/en/d/d8/Olympique_Marseille_logo.svg",
  "Monaco": "https://upload.wikimedia.org/wikipedia/en/8/8c/AS_Monaco_FC.svg",
  "Lille": "https://upload.wikimedia.org/wikipedia/en/3/34/LOSC_Lille_logo.svg",
  "Al-Ahly": "https://upload.wikimedia.org/wikipedia/en/6/6a/Al_Ahly_SC_logo.svg",
  "Al-Mokawloon": "https://upload.wikimedia.org/wikipedia/en/9/90/Al_Mokawloon_Arab_SC.svg",
  "Tottenham": "https://upload.wikimedia.org/wikipedia/en/b/b4/Tottenham_Hotspur_FC.svg",
  "Real Betis": "https://upload.wikimedia.org/wikipedia/en/2/2c/Real_Betis_Balompi%C3%A9.svg",
  "Girona": "https://upload.wikimedia.org/wikipedia/en/2/2a/Girona_FC.svg",
  "Eintracht Frankfurt": "https://upload.wikimedia.org/wikipedia/en/8/85/Eintracht_Frankfurt_Logo.svg",
  "Wolfsburg": "https://upload.wikimedia.org/wikipedia/en/6/6e/VfL_Wolfsburg_Logo.svg",
  "Rangers": "https://upload.wikimedia.org/wikipedia/en/2/2b/Rangers_FC.svg",
  "Olympiacos": "https://upload.wikimedia.org/wikipedia/en/1/18/Olympiacos_FC_Logo.svg",
  "PAOK": "https://upload.wikimedia.org/wikipedia/en/4/4a/PAOK_FC_logo.svg",
  "Napoli SC": "https://upload.wikimedia.org/wikipedia/commons/e/e0/SSC_Napoli.svg",
  "Burnley": "https://upload.wikimedia.org/wikipedia/en/7/7f/Burnley_FC.svg",
  "Fulham": "https://upload.wikimedia.org/wikipedia/en/8/81/Fulham_FC.svg",
  "Crystal Palace": "https://upload.wikimedia.org/wikipedia/en/9/9f/Crystal_Palace_FC_logo.svg",
};

export function clubLogo(club: string): string {
  return CLUB_LOGOS[club] || "https://upload.wikimedia.org/wikipedia/en/thumb/8/8a/Soccer_ball.svg/200px-Soccer_ball.svg.png";
}

export function flagUrl(countryCode: string): string {
  return `https://flagcdn.com/${countryCode}.svg`;
}
