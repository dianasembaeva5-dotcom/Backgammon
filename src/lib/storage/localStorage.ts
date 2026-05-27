export type GuestStats = {
  username: string;
  city: string;
  rating: number;
  totalGames: number;
  wins: number;
  losses: number;
  currentStreak: number;
  bestStreak: number;
  favoriteMode: string;
};

export type GuestGame = {
  id: string;
  date: string;
  mode: string;
  opponent: string;
  result: string;
  movesCount: number;
  duration: string;
  ratingChange: number;
};

const keys = {
  stats: "backgammon_guest_stats",
  games: "backgammon_guest_games",
  settings: "backgammon_guest_settings",
  theme: "backgammon_theme",
};

const fallbackStats: GuestStats = {
  username: "Guest Strategist",
  city: "Almaty",
  rating: 1000,
  totalGames: 0,
  wins: 0,
  losses: 0,
  currentStreak: 0,
  bestStreak: 0,
  favoriteMode: "Training",
};

function read<T>(key: string, fallback: T): T {
  if (typeof window === "undefined") return fallback;
  try {
    const value = window.localStorage.getItem(key);
    return value ? (JSON.parse(value) as T) : fallback;
  } catch {
    return fallback;
  }
}

function write<T>(key: string, value: T) {
  if (typeof window !== "undefined") window.localStorage.setItem(key, JSON.stringify(value));
}

export function saveGuestStats(stats: GuestStats) { write(keys.stats, stats); }
export function loadGuestStats() { return read(keys.stats, fallbackStats); }
export function saveGuestGame(game: GuestGame) { write(keys.games, [game, ...loadGuestGames()].slice(0, 50)); }
export function loadGuestGames() { return read<GuestGame[]>(keys.games, []); }
export function saveTheme(theme: "dark" | "light") { write(keys.theme, theme); }
export function loadTheme() { return read<"dark" | "light">(keys.theme, "dark"); }
export function clearGuestData() {
  if (typeof window === "undefined") return;
  Object.values(keys).forEach((key) => window.localStorage.removeItem(key));
}
