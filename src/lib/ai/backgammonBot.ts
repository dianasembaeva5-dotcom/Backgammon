import { applyMove } from "@/lib/game/gameReducer";
import { canMoveToPoint } from "@/lib/game/rules";
import { raceProgress } from "@/lib/game/scoring";
import { GameState, Move, Player } from "@/lib/game/types";

export type AIDifficulty = "easy" | "medium" | "hard";

export function getBestMove(gameState: GameState, legalMoves: Move[], difficulty: AIDifficulty): Move | null {
  if (!legalMoves.length) return null;
  if (difficulty === "easy") return legalMoves[Math.floor(Math.random() * legalMoves.length)];
  const ranked = [...legalMoves].sort((a, b) => evaluateMove(gameState, b) - evaluateMove(gameState, a));
  return difficulty === "medium" ? ranked[Math.floor(Math.random() * Math.min(2, ranked.length))] : ranked[0];
}

export function evaluateMove(gameState: GameState, move: Move): number {
  const after = applyMove(gameState, move);
  return (
    scoreHitBlot(gameState, move) +
    scoreMakePoint(gameState, move) +
    scoreSafety(after, move.player) +
    scoreHomeBoardStrength(after, move.player) +
    scoreRaceProgress(after, move.player)
  );
}

export function evaluateBoard(gameState: GameState, player: Player): number {
  return scoreSafety(gameState, player) + scoreHomeBoardStrength(gameState, player) + scoreRaceProgress(gameState, player);
}

export function scoreHitBlot(state: GameState, move: Move): number {
  if (move.to === "off") return 8;
  const point = state.board[move.to];
  return point.owner && point.owner !== move.player && point.count === 1 ? 35 : 0;
}

export function scoreMakePoint(state: GameState, move: Move): number {
  if (move.to === "off") return 10;
  const point = state.board[move.to];
  return point.owner === move.player && point.count === 1 ? 24 : 0;
}

export function scoreSafety(state: GameState, player: Player): number {
  return state.board.reduce((score, point, index) => {
    if (point.owner !== player) return score;
    if (point.count === 1) {
      const exposed = [1, 2, 3, 4, 5, 6].some((die) => {
        const threat = player === "white" ? index + die : index - die;
        return threat >= 0 && threat < 24 && canMoveToPoint(state, index, point.owner!);
      });
      return score + (exposed ? -8 : -3);
    }
    return score + Math.min(point.count, 3) * 4;
  }, 0);
}

export function scoreHomeBoardStrength(state: GameState, player: Player): number {
  const home = player === "white" ? [18, 19, 20, 21, 22, 23] : [0, 1, 2, 3, 4, 5];
  return home.reduce((score, index) => {
    const point = state.board[index];
    return score + (point.owner === player && point.count >= 2 ? 8 : 0);
  }, 0);
}

export function scoreRaceProgress(state: GameState, player: Player): number {
  return raceProgress(state, player) / 5 + state.borneOff[player] * 15 - state.bar[player] * 20;
}
