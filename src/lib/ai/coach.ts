import { GameState, Move } from "@/lib/game/types";

export type CoachInsight = {
  title: string;
  description: string;
  severity: "low" | "medium" | "high";
};

export type CoachReport = {
  summary: string;
  style: string;
  strengths: string[];
  mistakes: CoachInsight[];
  tips: string[];
};

export function generateGameAnalysis(gameHistory: Move[], finalState: GameState): CoachReport {
  const hits = gameHistory.filter((move) => move.to !== "off").length;
  const style = detectPlayerStyle(gameHistory);
  return {
    summary: `You played a ${style.toLowerCase()} match with ${gameHistory.length} recorded moves. ${finalState.winner ? `${finalState.winner} finished all checkers first.` : "The match ended before a full bear-off."}`,
    style,
    strengths: [
      hits > 8 ? "You kept pieces moving and created pressure across the board." : "You avoided reckless contact and kept the game controlled.",
      finalState.borneOff.white + finalState.borneOff.black > 4 ? "You converted race progress into borne-off checkers." : "You still have room to accelerate the race phase.",
      "You completed turns with valid dice usage and built a readable move history.",
    ],
    mistakes: [...detectRiskyMoves(gameHistory), ...detectMissedOpportunities(gameHistory)].slice(0, 4),
    tips: generateTrainingTips(gameHistory, finalState),
  };
}

export function detectRiskyMoves(gameHistory: Move[]): CoachInsight[] {
  const longMoves = gameHistory.filter((move) => move.die >= 5 && move.to !== "off");
  return longMoves.length > 2
    ? [{ title: "Watch long leaps", description: "Several large dice moves may have left single checkers exposed. Pair long escapes with builders when possible.", severity: "medium" }]
    : [{ title: "Risk profile looked stable", description: "You did not rely too heavily on exposed long-range moves.", severity: "low" }];
}

export function detectMissedOpportunities(gameHistory: Move[]): CoachInsight[] {
  const barEntries = gameHistory.filter((move) => move.from === "bar");
  return barEntries.length
    ? [{ title: "Opponent pressure landed", description: "You spent moves re-entering from the bar. Strengthen your home board before loose attacks.", severity: "high" }]
    : [{ title: "Look for stronger points", description: "When a point can be made, it is often better than simply racing a checker forward.", severity: "medium" }];
}

export function detectPlayerStyle(gameHistory: Move[]): string {
  const hitsOrBearOff = gameHistory.filter((move) => move.to === "off" || move.from === "bar").length;
  if (hitsOrBearOff > gameHistory.length / 4) return "Aggressive and tactical";
  if (gameHistory.length > 20) return "Patient and positional";
  return "Balanced";
}

export function generateTrainingTips(gameHistory: Move[], finalState: GameState): string[] {
  return [
    "Try to make points in your home board before launching risky hits.",
    "If you have a checker on the bar, re-entry is mandatory, so avoid giving the opponent easy shots.",
    finalState.mode === "fast" ? "In Fast Mode, borne-off checkers matter immediately. Shift into race mode earlier." : "Escape back checkers early so they do not become trapped behind a prime.",
  ];
}
