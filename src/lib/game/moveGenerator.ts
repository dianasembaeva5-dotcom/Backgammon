import { destinationFor, getDirection, isBearingOffAllowed, canMoveToPoint } from "./rules";
import { GameState, Move, Player } from "./types";

function canBearOffFrom(state: GameState, player: Player, from: number, die: number): boolean {
  if (!isBearingOffAllowed(state, player)) return false;
  const direct = from + die * getDirection(player);
  if (direct < 0 || direct > 23) return true;
  return false;
}

export function getLegalMovesForChecker(state: GameState, player: Player, from: number | "bar"): Move[] {
  if (state.status !== "moving" || state.currentPlayer !== player) return [];
  if (state.bar[player] > 0 && from !== "bar") return [];
  if (from !== "bar") {
    const point = state.board[from];
    if (!point || point.owner !== player || point.count === 0) return [];
  }

  return state.availableDice.flatMap<Move>((die) => {
    const to = destinationFor(from, die, player);
    if (from !== "bar" && canBearOffFrom(state, player, from, die)) {
      return [{ from, to: "off", die, player } satisfies Move];
    }
    if (to >= 0 && to < 24 && canMoveToPoint(state, to, player)) {
      return [{ from, to, die, player } satisfies Move];
    }
    return [];
  });
}

export function getLegalMoves(state: GameState, player: Player): Move[] {
  if (state.bar[player] > 0) return getLegalMovesForChecker(state, player, "bar");
  return state.board.flatMap((point, index) =>
    point.owner === player && point.count > 0 ? getLegalMovesForChecker(state, player, index) : []
  );
}

export function hasAnyLegalMove(state: GameState, player: Player): boolean {
  return getLegalMoves(state, player).length > 0;
}
