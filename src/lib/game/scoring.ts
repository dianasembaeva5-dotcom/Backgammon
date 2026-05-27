import { GameState, Player } from "./types";

export function raceProgress(state: GameState, player: Player): number {
  const direction = player === "white" ? 1 : -1;
  return state.board.reduce((score, point, index) => {
    if (point.owner !== player) return score;
    const progress = direction === 1 ? index + 1 : 24 - index;
    return score + progress * point.count;
  }, state.borneOff[player] * 30 - state.bar[player] * 12);
}

export function fastModeWinner(state: GameState): Player | null {
  if (state.borneOff.white !== state.borneOff.black) {
    return state.borneOff.white > state.borneOff.black ? "white" : "black";
  }
  const whiteRace = raceProgress(state, "white");
  const blackRace = raceProgress(state, "black");
  if (whiteRace !== blackRace) return whiteRace > blackRace ? "white" : "black";
  if (state.bar.white !== state.bar.black) return state.bar.white < state.bar.black ? "white" : "black";
  return null;
}
